import { UserService } from '@app/_services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { WeeklyReport } from '@app/_models/weeklyReport';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent implements OnInit {

  expenseForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    successMessage = '';
    reports: WeeklyReport;
    displayedColumns = ['weekNum', 'pay', 'totalSales', 'store', 'netProfit'];
 
  constructor(private formBuilder: FormBuilder,
            private userService: UserService) { }

  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      name: ['', Validators.required],
      cost: ['', Validators.required]
  });
  this.userService.getReports().subscribe( a => {
    this.reports = a
  });


  }


}
