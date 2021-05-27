import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html'
})

export class SnackBarComponent implements OnInit {


    message: string;
    class: string;
    duration: number;
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBar: MatSnackBar) {
        this.message = data.message;
        this.class = data.class;
        this.duration = data.duration;
       
        
    }

    ngOnInit() {
        this.snackBarOpen();
    }

    snackBarOpen() {
        
        this.snackBar.open(this.message, "X", {
            duration: this.duration,
            panelClass: this.class,
            horizontalPosition: 'left',
            verticalPosition: 'bottom'
        });
    }
}