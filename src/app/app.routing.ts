import { PayHistoryComponent } from './pay-history/pay-history.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { AuthGuard } from './_helpers';
import { EmployeeComponent } from './employee/employee.component';
import { AdminPayHistoryComponent } from './admin-payHistory/admin-payHistory.component';
import { SalesComponent } from './sales/sales.component';
import { ReportsComponent } from './reports/reports.component';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    {path: 'list', component: TimesheetComponent},
    {path: 'payhistory', component: PayHistoryComponent},
    {path: 'sales', component: SalesComponent},
    {path: 'reports', component: ReportsComponent},
    {path: 'expenses', component: ExpensesComponent},
    {path: 'employee/:id', component: EmployeeComponent},
    {path: 'employee/:id/timesheet', component: TimesheetComponent},
    {path: 'employee/:id/payHistory', component: AdminPayHistoryComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);