import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Promotion } from 'src/app/models/promotion.model';
import { MessageComponent } from 'src/app/pop-up/message/message.component';
import { SuccessComponent } from 'src/app/pop-up/success/success.component';
import { HomestayService } from 'src/app/services/homestay.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { DatePipe } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.scss'],
})
export class PromotionCreateComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private httpHomestay: HomestayService,
    private httpPromotion: PromotionService,
    public datepipe: DatePipe,
    private storage: AngularFireStorage,
  ) {}

  items!: Promotion;
  message: any;
  valueHomestay: any = [];
  valueBloc: any = [];
  minDateStart!: Date;
  maxDate!: Date;
  name!: string;
  discountPercent!: number;
  description!: string;
  startDate!: string;
  endDate!: string;
  thumbnailUrl!: string;
  blocNameList: string[] = [];
  homestayNameList: string[] = [];
  files: File[] = [];
  file!: File;
  showDiv = true;

  ngOnInit(): void {
    this.getHomestayActivating();
    this.getBlocActivating();
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    this.minDateStart = new Date(currentDate);
    this.maxDate = new Date(currentYear + 0, currentDate.getMonth() + 6, 0);
    console.log('maxDate', this.maxDate);
  }

  getHomestayActivating() {
    this.valueHomestay = [];
    this.httpHomestay
      .getHomestayByLandlord('ACTIVATING')
      .subscribe(async (data) => {
        console.log('data homestay:', data['homestays']);
        for (let i of data['homestays'].reverse()) {
          this.valueHomestay.push({
            name: i.name,
            status: false,
          });
        }
      });
  }

  getBlocActivating() {
    this.valueBloc = [];
    this.httpHomestay
      .getBlocByLandlord('ACTIVATING')
      .subscribe(async (data) => {
        console.log('data blocs:', data['blocs']);
        for (let i of data['blocs'].reverse()) {
          this.valueBloc.push({
            name: i.name,
            status: false,
          });
        }
      });
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

  addItems(form: NgForm) {
    this.convert(this.startDate, this.endDate);
    if (this.valid() == true) {
      let homestay = [];
      for (let i of this.valueHomestay) {
        if (i.status == true) {
          homestay.push(i.name);
        }
      }
      let bloc = [];
      for (let i of this.valueBloc) {
        if (i.status == true) {
          bloc.push(i.name);
        }
      }
      this.items={
        name: this.name,
        description: this.description,
        blocNameList: bloc,
        discountPercent: this.discountPercent as number,
        endDate: this.endDate,
        homestayNameList: homestay,
        startDate: this.startDate,
        thumbnailUrl: this.thumbnailUrl,
      };
      console.log('submit items:', this.items);
      try {
        this.httpPromotion.createPromotionCampaign(this.items).subscribe( (data)=>{
          const datas = data;
          for(this.file of this.files){
            const path = 'campaign/' + this.name +  this.file.name;
          const fileRef = this.storage.ref(path);
          this.storage.upload(path, this.file);
          }
          this.message = 'Create Promotion Success';
          this.openDialogSuccess();
          this.name = '';
          this.discountPercent =0;
          this.startDate = '';
          this.endDate = '';
          this.description = '';
          this.files = [];
          this.getHomestayActivating();
          this.getBlocActivating();
          this.showDiv = true;
        });
      } catch (error) {
        this.message = error as string;
      this.openDialogMessage();
      console.log(error);
      }

    } else {
      this.openDialogMessage();
    }
  }
  checked = false;
  public valid() {
    this.checked = false;
    if (this.name == '' || !this.name) {
      this.message = 'Please enter name promotion';
      return;
    } else if (
      this.discountPercent >= 50 ||
      this.discountPercent <= 1 ||
      !this.discountPercent
    ) {
      this.message = 'Discount Percent between 1% and 50%';
      return;
    }
    for (let i of this.valueHomestay) {
      if (i.status == true) {
        this.checked = true;
      }
    }
    for (let i of this.valueBloc) {
      if (i.status == true) {
        this.checked = true;
      }
    }
    if (this.checked == false) {
      this.message = 'Please choose Homestay or Block-Homestay';
      return;
    } else return true;
  }

  dob: any;
  convert(startDate: any, endDate: any): void {
    var date = new Date(startDate),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    this.startDate = [date.getFullYear(), mnth, day].join('-');
    console.log('convert', this.startDate);

    var date = new Date(endDate),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    this.endDate = [date.getFullYear(), mnth, day].join('-');
    console.log('convert', this.endDate);
  }

  onSelect(files: any) {
    console.log(event);
    this.files.push(...files.addedFiles);
    if (this.files.length >= 1) {
      this.showDiv = false;
    }

    for (this.file of this.files) {
      this.thumbnailUrl = this.name + this.file.name;
    }
  }
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);

    if (this.files.length >= 1) {
      this.showDiv = false;
    } else {
      this.showDiv = true;
    }
  }
}
