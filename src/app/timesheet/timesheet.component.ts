import { DialogMergeComponent } from './../dialog-merge/dialog-merge.component';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Component, OnInit,Input, ModuleWithComponentFactories } from '@angular/core';
import { EmployeeTimesheet } from '@app/_models/employeeTimeSheet';
import { UserService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig, TooltipPosition } from '@angular/material';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.less']
})
export class TimesheetComponent implements OnInit {
timesheet:  any;
p: number = 1;
employeeID: number = 0;
selection = new SelectionModel<EmployeeTimesheet>(true, []);
error: string;
loading = false;
filterForm: FormGroup;
ids: number[] = [];
dateString: string;
@Input('matTooltipPosition') position: TooltipPosition;
doMerge: boolean = false;




displayedColumns: string[] = ['Day', 'ClockedIn', 'ClockedOut', 
//'LunchIn', 'LunchOut', 
'HoursWorked'
//, 'LunchHour'
];
  constructor(private userService: UserService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: Router) { }

  ngOnInit() {
    this.employeeID= this.router.snapshot.params['id'];
    this.filterForm = this.formBuilder.group({
      payRate: [''],
      name:['']
  });
    if(this.employeeID != undefined){
      this.displayedColumns = ['select','Day', 'ClockedIn', 'ClockedOut', 
      //'LunchIn', 'LunchOut', 
      'HoursWorked', 'ClockInLoc', 'ClockOutLoc'
      //, 'LunchHour'
      ];
    }
    this.userService.getAll(this.employeeID)
    .subscribe(a  => {
      if(a){

    
        this.timesheet = new MatTableDataSource<EmployeeTimesheet>(a);
      }
    })
  }

  get f() { return this.filterForm.controls; }

  formatDate(date: string): string {
    
    if (date) {
      
      this.dateString = date.replace('T', ' ');

      return this.dateString;
    }
    return date;
  }

  merge(){
    if(this.f.payRate.value == '' || this.f.payRate.value == null ||
    this.f.name.value == '' || this.f.name.value == null){
    
    }
    else{
      
     
      for(let i = 0; i < this.selection.selected.length;i++){
        this.ids.push(this.selection.selected[i].timesheetID);
      }

      this.userService.mergePay(this.ids, this.employeeID, this.f.payRate.value, this.f.name.value)
      .subscribe(a => {
        this.route.navigate(['/employee/'+this.employeeID+'/payHistory']);
      });

    }
    
   

  }

  onSubmit(){

    if(this.f.from.value == null && this.f.to.value == null){
      
    }
    else{
    if(this.f.form.value > this.f.to.value){
      this.error = "From cannot be greater than to date";
    }
    else{
      
    }
  }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
  
    if(!this.selection.isEmpty){
    const numSelected = this.selection.selected.length;
    const numRows = this.timesheet.data.length;
    return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.timesheet.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EmployeeTimesheet): string {
  
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.timesheetID + 1}`;
  }

  redirect(lat: number, long: number){
      if(lat != null && long != null){
        window.open("https://www.google.com/maps/search/?api=1&query="+lat+"%2C"+long, "_blank");
        
      }
     
  }



}
