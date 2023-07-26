import { MediaMatcher } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit
{

  constructor(public dialog: MatDialog) {}

  items: any[] = [];
  message: any;
  Error: string = '';
  valueday30: Array<number> = [];
  valueday31: Array<number> = [];
  valueday28: Array<number> = [];
  valueMonth: Array<number> = [];
  valueMonthName: Array<string> = [
    'January ',
    'February ',
    'March ',
    'April ',
    'May ',
    'June ',
    'July',
    'August',
    'September',
    'October',
    'November ',
    'December ',
  ];
  startDay = '1';
  endDay = '1';
  startMonth = '1';
  endMonth = '1';
  description = '';
  flag = false;

  ngOnInit(): void {
    this.items.push({
      name: '',
      percent: '',
      description: '',
      startDay:this.startDay,
      startMonth:this.startMonth,
      endDay:this.endDay,
      endMonth:this.endMonth,
    });
    for (let index = 1; index < 31; index++) {
      this.valueday30.push(index);
    }
    for (let index = 1; index < 32; index++) {
      this.valueday31.push(index);
    }
    for (let index = 1; index < 29; index++) {
      this.valueday28.push(index);
    }
    for (let index = 1; index < 13; index++) {
      this.valueMonth.push(index);
    }

  }



  addMoreItems() {
    this.items.push({
      name: '',
      percent: '',
      startDay: '1',
      endDay: '1',
      startMonth: '1',
      endMonth: '1',
      description: ''
    });
  }

  removeItems(i: any) {
    this.items.splice(i, 1);
  }


  openDialogMessage() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    this.dialog.open(SuccessComponent, {
      data: this.message,
    });
  }
  addItems(form: NgForm){
    console.log('submit items:' , this.items);
  }
}
