import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PayHistory } from '@app/_models/payHistory';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-admin-payHistory',
  templateUrl: './admin-payHistory.component.html',
  styleUrls: ['./admin-payHistory.component.less']
})
export class AdminPayHistoryComponent implements OnInit {
  userId: number;
  payHistoryList: PayHistory[] = [];

  displayedColumns: string[] = ['payName', 'startPeriod', 'endPeriod', 'totalHours', 'payRate','amountPaid', 'paid', 'star'];

  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params["id"];
    this.userService.getPayHistory(this.userId)
    .subscribe(a => {
      this.payHistoryList = a
    });
  }

  formatDate(date: string): string {
    if (date) {
      
      return date.substring(0,10);
    }
    return date;
  }

  round(value: number){
    return Math.round(value);
  }

  updateStatus(row: any){
    
    this.userService.updatePayStatus(row.payHistoryID)
    .subscribe(a =>{
      this.payHistoryList = a
    });
  }

}
