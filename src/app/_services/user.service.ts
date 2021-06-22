import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Employee } from '@app/_models/employee';
import { EmployeeTimesheet } from '@app/_models/employeeTimeSheet';
import { PayHistory } from '@app/_models/payHistory';
import { WeeklyReport } from '@app/_models/weeklyReport';
import { Expenses } from '@app/_models/expenses';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    isClockedIn() {
        return this.http.get<boolean>(`${environment.apiUrl}/api/employee/clockedIn`);
    }

    getAll(userID: number = 0, fromDate: Date = new Date("1995-01-01"), toDate: Date = new Date("2025-01-01"))
    {
        if(userID == 0){
        return this.http.get<EmployeeTimesheet[]>(`${environment.apiUrl}/api/employee/employeeViewList`,
        {
            params: 
            {
                fromDate: fromDate.toDateString(),
                toDate: toDate.toDateString() 
            }   
        })     .pipe(map(data => data),
        catchError((error) => throwError(error)));;
    }
    else{
        return this.http.get<EmployeeTimesheet[]>(`${environment.apiUrl}/api/employee/employeeViewList`,
        {
            params: 
            {
                fromDate: fromDate.toDateString(),
                toDate: toDate.toDateString(),
                userID: userID.toString()
            }   
        })     .pipe(map(data => data),
        catchError((error) => throwError(error)));;
    
    }
        
    }

    logTime(clockedIn: boolean, lat: any, long: any )
    {
        var obj = null;
        let dateTime = new Date();
       
       
         obj = {
            Latitude: lat,
            Longitude: long,
            date: dateTime.toLocaleString().replace(',','')
        }
    
   
        return this.http.post<any>(`${environment.apiUrl}/api/employee`,obj)
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
        
    }

    getPayHistory(userID: number = 0){
        if(userID == 0){
        return this.http.get<any>
        (`${environment.apiUrl}/api/employee/payHistory`)
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
        }
        else{
            return this.http.get<any>
        (`${environment.apiUrl}/api/employee/payHistory`,
        {
            params:{
                userID: userID.toString()
            }
        })
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
        }
    }

    getAllUsers(){
        return this.http.get<Employee[]>
        (`${environment.apiUrl}/api/Admin`)
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
    }

    getUserDetail(userId: number){
        return this.http.get<Employee>
        (`${environment.apiUrl}/api/Admin/userDetail`,{
            params:{
                userID: userId.toString()
            }
        })
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
    }

    mergePay(ids: number[], userId: number, payRate: number, name: string ){
        const obj = {
            TimesheetIDs : ids,
            PayRate: payRate,
            PayHistoryName: name,
            UserID: Number.parseInt(userId.toString())
        };

        return this.http.post<any>
        (`${environment.apiUrl}/api/employee/calculatePay`,obj)
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
    }

    updatePayStatus(payHistoryID: number){
        console.log(payHistoryID);
        return this.http.get<PayHistory[]>
        (`${environment.apiUrl}/api/admin/changePaidStatus`,{
            params:{
                payHistoryID: payHistoryID.toString()
            }
        })
        .pipe(map(data => data),
        catchError((error) => throwError(error)));

    }

    saveSales(date: Date, amount: number){
        const obj = {
            SalesDate: date.toString(),
            Amount: amount
        };
        return this.http.post<any>
        (`${environment.apiUrl}/api/employee/sales`,obj);
    }

    getSales(){
        
        return this.http.get<any>
        (`${environment.apiUrl}/api/admin/sales`)
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
    }

    addExpenses(name: string, cost: number){
        
        const obj = {
            expenseName: name,
            cost: cost
        }
        return this.http.post<any>
        (`${environment.apiUrl}/api/admin/expenses`, obj)
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
    }

    getReports(){
        
       
        return this.http.get<WeeklyReport>
        (`${environment.apiUrl}/api/admin/reports`)
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
    }

    getExpenses(){
        
       
        return this.http.get<Expenses[]>
        (`${environment.apiUrl}/api/admin/expensesList`)
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
    }

    getFile(weekNum: number): Observable<any>{
        let fileExtension = 'text/csv';

  return this.http.get(`${environment.apiUrl}/api/admin/reportFile?weekNum=${weekNum}`
  ,{responseType: 'blob'})
  .pipe(
    map((res) => {
          
          var blob = new Blob([res], {type: fileExtension})
          return blob;            
    }));

    }


    addBonus(payHistoryID: number, amount: number){
        return this.http.get<Expenses[]>
        (`${environment.apiUrl}/api/admin/addBonus`, {
            params:{
                payHistoryID: payHistoryID.toString(),
                amount: amount.toString()
            }
        })
        .pipe(map(data => data),
        catchError((error) => throwError(error)));
    }


}