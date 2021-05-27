import { Employee } from './../_models/employee';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
employee: Employee;
userId :number;
  constructor(private userService: UserService
    ,private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.userId = this.router.snapshot.params['id'];
    this.userService.getUserDetail(this.userId)
    .subscribe(a => {
      this.employee = a
    });
    
  }

  getTimesheet(){
    this.route.navigate(['employee/'+this.userId+'/timesheet']);
  }

  getPayHistory(){
    this.route.navigate(['employee/'+this.userId+'/payHistory']);
  }

 

}
