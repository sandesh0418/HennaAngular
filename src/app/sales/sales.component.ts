import { Component, OnInit } from '@angular/core';
import { Sales } from '@app/_models/sales';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.less']
})
export class SalesComponent implements OnInit {

  sales: Sales[];
  displayedColumns = ['date', 'amount'];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getSales()
    .subscribe(a => {
      this.sales = a;
    })
  }

  formatDate(date: string): string {
    if (date) {
      
      return date.substring(0,10);
    }
    return date;
  }

}
