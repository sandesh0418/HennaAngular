import { Expenses } from './../_models/expenses';
import { UserService } from '@app/_services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { WeeklyReport } from '@app/_models/weeklyReport';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.less']
})
export class ExpensesComponent implements OnInit {
  expenseForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  successMessage = '';
  expenses: Expenses[];
  displayedColumns = ['expensesName', 'cost'];
private _success = new Subject<string>();
@ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
@ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

constructor(private formBuilder: FormBuilder,
  private userService: UserService) { }


ngOnInit() {
  this.expenseForm = this.formBuilder.group({
    name: ['', Validators.required],
    cost: ['', Validators.required]
});
this.userService.getExpenses().subscribe( a => {
  this.expenses = a
});
this._success.subscribe(message => this.successMessage = message);
this._success.pipe(debounceTime(5000)).subscribe(() => {
  if (this.selfClosingAlert) {
    this.successMessage = null;
  }
});

}

get f() { return this.expenseForm.controls; }

onSubmit(){
  this.submitted = true;

      // stop here if form is invalid
      if (this.expenseForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.addExpenses(this.f.name.value, this.f.cost.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.loading = false;
                  this._success.next(data.message);
                  
                this.userService.getExpenses().subscribe( a => {
                  this.expenses = a
                });
                  
              },
              error => {
                  this.error = "Problem adding expense!";
                  this.loading = false;
              });
}

getTotalCost(){
  return this.expenses.map(t => t.cost).reduce((acc, value) => acc + value, 0);
}

}
