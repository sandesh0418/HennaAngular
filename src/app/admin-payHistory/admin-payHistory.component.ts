import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
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
  bonusControl: FormControl = new FormControl(0, [Validators.required]);
  currentPayHistoryID: number = 0 ;

  displayedColumns: string[] = ['payName', 'startPeriod', 'endPeriod', 'totalHours', 'payRate','amountPaid', 'paid', 'updatePaidStatus', 'bonus'];

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
    return Math.ceil(value);
  }

  updateStatus(row: any){
    
    this.userService.updatePayStatus(row.payHistoryID)
    .subscribe(a =>{
      this.payHistoryList = a
    });
  }

  setPayHistoryID(payHistoryID: number){
this.currentPayHistoryID = payHistoryID;
  }

  addBonus(){
    if(this.bonusControl.value > 0 && this.currentPayHistoryID > 0){
      this.userService.addBonus(this.currentPayHistoryID, this.bonusControl.value)
      .subscribe(a => 
        {
          if(a){
            this.userService.getPayHistory(this.userId)
    .subscribe(a => {
      this.payHistoryList = a;
      this.bonusControl.setValue(0);

    });

          }
        }
      );
        
    }
  }

}
