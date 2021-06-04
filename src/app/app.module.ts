import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; 


import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import {MatTableModule} from '@angular/material/table';
import { PayHistoryComponent } from './pay-history/pay-history.component';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { EmployeeComponent } from './employee/employee.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogMergeComponent } from './dialog-merge/dialog-merge.component';
import { AdminPayHistoryComponent } from './admin-payHistory/admin-payHistory.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { SalesComponent } from './sales/sales.component';
import { ReportsComponent } from './reports/reports.component';
import { ExpensesComponent } from './expenses/expenses.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        MatButtonModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        NgxPaginationModule,
        MatTableModule,
        MatIconModule,
        MatExpansionModule,
        MatDividerModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatDialogModule,
        NgbAlertModule,
        NgbPaginationModule
        
        
        
    ],
    declarations: [										
        AppComponent,
        HomeComponent,
        LoginComponent,
      SnackBarComponent,
      TimesheetComponent,
      PayHistoryComponent,
      EmployeeComponent,
      DialogMergeComponent,
      AdminPayHistoryComponent,
      SalesComponent,
      SalesComponent,
      ReportsComponent,
      ExpensesComponent
   ],
   entryComponents: [SnackBarComponent, DialogMergeComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

       
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }