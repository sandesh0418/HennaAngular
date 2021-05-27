import { Component, OnInit } from '@angular/core';
import { PayHistory } from '@app/_models/payHistory';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-pay-history',
  templateUrl: './pay-history.component.html',
  styleUrls: ['./pay-history.component.less']
})
export class PayHistoryComponent implements OnInit {

  panelOpenState = false;
  list: PayHistory[];
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getPayHistory()
    .subscribe(a => {
      this.list = a;
    })
  }

  transform(value: any, rate: any){
    return Math.round(value*rate*100)/100;
  }
  
  formatDate(date: string){
    return date.substring(0,10);
  }
}
