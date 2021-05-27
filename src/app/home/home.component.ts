import { Component, Output,EventEmitter, ViewChild} from '@angular/core';
import { first, debounceTime } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { SnackBarComponent } from '@app/snack-bar/snack-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '@app/_models/employee';
import {Subject} from 'rxjs';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';


@Component({ templateUrl: 'home.component.html',
selector: 'home'})
export class HomeComponent {
    loading = false;
    clockedIn: boolean = false;
    name: string;
    submitted = false;
    userList: Employee[];
    isAdmin: boolean;
    salesForm: FormGroup;
    error: string = "";
    staticAlertClosed = false;
  successMessage = '';
    locationOn: boolean = false;

  private _success = new Subject<string>();
  @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
   
    durationInSeconds  = 100000;
    constructor(private userService: UserService, 
        private authenticationService: AuthenticationService
        ,private _snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.salesForm = this.formBuilder.group({
            date: ['', Validators.required],
            amount: ['', Validators.required]
        });
        if(this.authenticationService.currentUserValue.isAdmin){
            this.userService.getAllUsers()
            .subscribe(a => {
                this.userList = a;
                this.loading = false;
            });
            this.isAdmin = true;
        }
        else{
        this.userService.isClockedIn().
        pipe(first()).subscribe(c => {
            this.loading = false;
            this.clockedIn = c;
        });
        this.isAdmin = false;
    }
    this.name = this.authenticationService.currentUserValue.name;
    

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.successMessage = null;
      }
    });
   

        
    }

    openSnackBar(message: string, action: string){
        this._snackBar.openFromComponent(SnackBarComponent,{
            data: {
                duration: this.durationInSeconds,
                message: message,
                class: "success"
            }}).closeWithAction();
    }

    saveTime(){
        this.loading = true;

       
        navigator.geolocation.getCurrentPosition((position) => {
            this.error = "";
           
            this.locationOn = true;
            
            

            this.userService.logTime(this.clockedIn,position.coords.latitude,position.coords.longitude)
            .subscribe((a: string) => {
                
              this.router.navigate(['/list']);
             
                
                
                });
        });

      
            

        
        if(this.locationOn == false){
            this.loading = false;
            this.error = "Please turn on the location!";
        }
   
     
    }
    get f() { return this.salesForm.controls; }

    onClickEmployee(userID: number){
        
        this.router.navigate(['employee/'+userID]);
    }

    onSubmit(){
        this.submitted = true;

        // stop here if form is invalid
        if (this.salesForm.invalid) {
            return;
        }

   

        this.userService.saveSales(this.f.date.value, this.f.amount.value)
        .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                    this._success.next(data.message);
                    
                    
                },
                error => {
                    this.error = "Invalid Data!";
                    this.loading = false;
                });
    }


}