import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { HomestayService } from 'src/app/services/homestay.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormField } from '@angular/material/form-field';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';
import { GoongService } from '../../../services/goong.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-register-homestay',
  templateUrl: './register-homestay.component.html',
  styleUrls: ['./register-homestay.component.scss'],
})
export class RegisterHomestayComponent implements OnInit, AfterViewInit {
  //
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private httpHomestay: HomestayService,
    private httpGoong: GoongService,
    private storage: AngularFireStorage,
    private currencyPipe: CurrencyPipe
  ) {}

  // homestayName: string = '';
  // totalRoom: string = '';
  // address: string = '';
  // city: string = '';

  ngOnInit(): void {}

  // information

  informationFormGroup = this._formBuilder.group({
    homestayName: ['', Validators.required],
    address: ['', Validators.required],
    number: ['', Validators.required],
    roomCapacity: ['', Validators.required],
    homestayLicense: [false, Validators.requiredTrue],
  });
  homestayName: string = '';
  address: string = '';
  totalRoom: number = 0;
  roomCapacity: number = 0;
  isHomestayLicense: boolean = false;
  informationForm() {
    // Lay value
    this.flag = false;

    console.log(this.informationFormGroup.value);
    const formInformationFormGroupValue = this.informationFormGroup.controls;
    this.homestayName = formInformationFormGroupValue.homestayName.value!;
    this.address = formInformationFormGroupValue.address.value!;
    this.totalRoom = parseInt(formInformationFormGroupValue.number.value!);
    this.roomCapacity = parseInt(
      formInformationFormGroupValue.roomCapacity.value!
    );
    this.isHomestayLicense =
      formInformationFormGroupValue.homestayLicense.value!;
    if (this.homestayName === '') {
      this.message = "Please enter homestay's name";
      this.openDialogMessage();
      return;
    } else if (this.address === '') {
      this.message = 'Please enter address';
      this.openDialogMessage();
      return;
    } else if (this.totalRoom === 0) {
      this.message = 'Please enter total room';
      this.openDialogMessage();
      return;
    } else if (!this.isHomestayLicense) {
      this.message = 'Please upload at a photo of your Homestay License';
      this.openDialogMessage();
      return;
    } else if (this.totalRoom > 100) {
      this.message = 'Total room must be less than 100';
      this.openDialogMessage();
      return;
    } else if (this.roomCapacity > 20) {
      this.message = 'Room Capacity must be less than 20';
      this.openDialogMessage();
      return;
    } else {
      this.result = '';
      this.flag = true;
      this.stepper.next();
    }
  }

  // Facility
  facilityFormGroup = this._formBuilder.group({
    tv: false,
    tvAmount: [{ value: '', disabled: true }],
    wifi: false,
    wifiAmount: [{ value: '', disabled: true }],
    fan: false,
    wardrobe: false,
    table: false,
    chair: false,
    airCondition: false,
    fanAmount: [{ value: '', disabled: true }],
    wardrobeAmount: [{ value: '', disabled: true }],
    tableAmount: [{ value: '', disabled: true }],
    chairAmount: [{ value: '', disabled: true }],
    airConditionAmount: [{ value: '', disabled: true }],
  });
  homestayFacilities: Array<{ name: string; quantity: string }> = [];
  facilityForm() {
    this.homestayFacilities = [];
    console.log(this.facilityFormGroup.value);
    // tv
    if (this.facilityFormGroup.controls.tv.value == true) {
      this.homestayFacilities.push({
        name: 'tv',
        quantity: this.facilityFormGroup.controls['tvAmount'].value as string,
      });
    }

    // wifi
    if (this.facilityFormGroup.controls.wifi.value == true) {
      this.homestayFacilities.push({
        name: 'wifi',
        quantity: this.facilityFormGroup.controls['wifiAmount'].value as string,
      });
    }

    // fan
    if (this.facilityFormGroup.controls.fan.value == true) {
      this.homestayFacilities.push({
        name: 'fan',
        quantity: this.facilityFormGroup.controls['fanAmount'].value as string,
      });
    }

    // airCondition
    if (this.facilityFormGroup.controls.airCondition.value == true) {
      this.homestayFacilities.push({
        name: 'airCondition',
        quantity: this.facilityFormGroup.controls['airConditionAmount']
          .value as string,
      });
    }

    // wardrobe
    if (this.facilityFormGroup.controls.wardrobe.value == true) {
      this.homestayFacilities.push({
        name: 'wardrobe',
        quantity: this.facilityFormGroup.controls['wardrobeAmount']
          .value as string,
      });
    }

    // table
    if (this.facilityFormGroup.controls.table.value == true) {
      this.homestayFacilities.push({
        name: 'table',
        quantity: this.facilityFormGroup.controls['tableAmount']
          .value as string,
      });
    }

    // chair
    if (this.facilityFormGroup.controls.chair.value == true) {
      this.homestayFacilities.push({
        name: 'chair',
        quantity: this.facilityFormGroup.controls['chairAmount']
          .value as string,
      });
    }

    for (let f of this.newFacility) {
      this.homestayFacilities.push({ name: f.name, quantity: f.price });
    }
    console.log('facilities:', this.homestayFacilities);

    // console.log(this.homestayFacilities)
  }
  enableInputTv() {
    if (this.facilityFormGroup.controls.tv.value == true) {
      this.facilityFormGroup.controls.tvAmount.enable();
      this.facilityFormGroup.controls.tvAmount.clearValidators();
      this.facilityFormGroup.controls.tvAmount.setValue('1');
    } else {
      this.facilityFormGroup.controls.tvAmount.disable();
      this.facilityFormGroup.controls.tvAmount.reset();
    }
  }
  enableInputWifi() {
    if (this.facilityFormGroup.controls.wifi.value == true) {
      this.facilityFormGroup.controls.wifiAmount.enable();
      this.facilityFormGroup.controls.wifiAmount.clearValidators();
      this.facilityFormGroup.controls.wifiAmount.setValue('1');
    } else {
      this.facilityFormGroup.controls.wifiAmount.disable();
      this.facilityFormGroup.controls.wifiAmount.reset();
    }
  }
  // fan
  enableInputfan() {
    if (this.facilityFormGroup.controls.fan.value == true) {
      this.facilityFormGroup.controls.fanAmount.enable();
      this.facilityFormGroup.controls.fanAmount.clearValidators();
      this.facilityFormGroup.controls.fanAmount.setValue('1');
    } else {
      this.facilityFormGroup.controls.fanAmount.disable();
      this.facilityFormGroup.controls.fanAmount.reset();
    }
  }
  // airCondition
  enableInputAirCondition() {
    if (this.facilityFormGroup.controls.airCondition.value == true) {
      this.facilityFormGroup.controls.airConditionAmount.enable();
      this.facilityFormGroup.controls.airConditionAmount.clearValidators();
      this.facilityFormGroup.controls.airConditionAmount.setValue('1');
    } else {
      this.facilityFormGroup.controls.airConditionAmount.disable();
      this.facilityFormGroup.controls.airConditionAmount.reset();
    }
  }
  // wardrobe
  enableInputwardrobe() {
    if (this.facilityFormGroup.controls.wardrobe.value == true) {
      this.facilityFormGroup.controls.wardrobeAmount.enable();
      this.facilityFormGroup.controls.wardrobeAmount.clearValidators();
      this.facilityFormGroup.controls.wardrobeAmount.setValue('1');
    } else {
      this.facilityFormGroup.controls.wardrobeAmount.disable();
      this.facilityFormGroup.controls.wardrobeAmount.reset();
    }
  }
  // table
  enableInputtable() {
    if (this.facilityFormGroup.controls.table.value == true) {
      this.facilityFormGroup.controls.tableAmount.enable();
      this.facilityFormGroup.controls.tableAmount.clearValidators();
      this.facilityFormGroup.controls.tableAmount.setValue('1');
    } else {
      this.facilityFormGroup.controls.tableAmount.disable();
      this.facilityFormGroup.controls.tableAmount.reset();
    }
  }
  enableInputchair() {
    if (this.facilityFormGroup.controls.chair.value == true) {
      this.facilityFormGroup.controls.chairAmount.enable();
      this.facilityFormGroup.controls.chairAmount.clearValidators();
      this.facilityFormGroup.controls.chairAmount.setValue('1');
    } else {
      this.facilityFormGroup.controls.chairAmount.disable();
      this.facilityFormGroup.controls.chairAmount.reset();
    }
  }
  // New Facility

  newFacility: any[] = [];

  addFacility() {
    this.newFacility.push({ name: '', status: false });
    console.log(this.newFacility);
    // console.log(this.newFacility[this.newFacility.length-1]);
    // if(this.newFacility[this.newFacility.length-1]["status"] === true){
    //   this.homestayFacilities.push({name: this.newFacility[this.newFacility.length-1]["name"],quantity: this.newFacility[this.newFacility.length-1]["price"]})
    // }
    // console.log(this.homestayFacilities)
  }

  removeFacility(i: any) {
    this.newFacility.splice(i, 1);
    // console.log(this.newFacility[i]);
    // if(this.newFacility[i]["status"] === false){
    //   this.homestayFacilities.splice(i+2,1)
    // }
    // this.homestayFacilities.splice(i+2,1)
    // console.log(this.homestayFacilities)
  }

  // house rule
  houseRuleFormGroup = this._formBuilder.group({
    smoking: false,
    pet: false,
    children: false,
    party: false,
  });
  homestayRules: any[] = [];
  houseRuleForm() {
    this.homestayRules = [];

    if (this.houseRuleFormGroup.value['pet'] === true) {
      this.homestayRules.push({ description: 'non pet' });
    }
    if (this.houseRuleFormGroup.value['smoking'] === true) {
      this.homestayRules.push({ description: 'non smoking' });
    }
    if (this.houseRuleFormGroup.value['children'] === true) {
      this.homestayRules.push({ description: 'Children allowed' });
    }
    if (this.houseRuleFormGroup.value['party'] === true) {
      this.homestayRules.push({ description: 'Parties/envents allowed' });
    } else {
      this.result = '';
      this.flag = true;
      this.stepper.selectedIndex = 3;
      console.log(this.houseRuleFormGroup.value);
      // this.stepper.next();
    }
    console.log(this.houseRuleFormGroup.value);
  }

  // Service
  serviceFormGroup = this._formBuilder.group({
    breakfast: false,
    breakfastPrice: [{ value: '', disabled: true }],
    sauna: false,
    saunaPrice: [{ value: '', disabled: true }],
    spa: false,
    spaPrice: [{ value: '', disabled: true }],
    airportShuttle: false,
    airportShuttlePrice: [{ value: '', disabled: true }],
  });
  homestayServices: Array<{ name: string; price: number }> = [];
  serviceForm() {
    this.homestayServices = [];
    var valid = false;
    console.log(this.serviceFormGroup.value);
    console.log(this.newService);

    if (this.serviceFormGroup.controls['breakfast'].value === true) {
      this.homestayServices.push({
        name: 'Breakfast',
        price: this.serviceFormGroup.controls['breakfastPrice']
          .value as unknown as number,
      });
    }
    if (this.serviceFormGroup.controls.spa.value === true) {
      this.homestayServices.push({
        name: 'Spa',
        price: this.serviceFormGroup.controls.spaPrice
          .value as unknown as number,
      });
    }
    if (this.serviceFormGroup.controls.airportShuttle.value === true) {
      this.homestayServices.push({
        name: 'Airport Transfers',
        price: this.serviceFormGroup.controls.airportShuttlePrice
          .value as unknown as number,
      });
    }

    if (this.serviceFormGroup.controls.sauna.value === true) {
      this.homestayServices.push({
        name: 'Sauna',
        price: this.serviceFormGroup.controls.saunaPrice
          .value as unknown as number,
      });
    }

    if (this.newService.length > 0) {
      for (let items of this.newService) {
        if (items.status == true && items.name == '') {
          valid = false;
          this.message = 'Please enter New Service Name';
          this.openDialogMessage();
          return;
        } else {
          valid = true;
          this.homestayServices.push({ name: items.name, price: items.price });
        }
      }
    } else {
      valid = true;
    }
  }

  enableInputBreakfast() {
    if (this.serviceFormGroup.controls.breakfast.value === true) {
      this.serviceFormGroup.controls.breakfastPrice.enable();
    } else {
      this.serviceFormGroup.controls.breakfastPrice.disable();
    }
  }
  enableInputSpa() {
    if (this.serviceFormGroup.controls.spa.value === true) {
      this.serviceFormGroup.controls.spaPrice.enable();
    } else {
      this.serviceFormGroup.controls.spaPrice.disable();
    }
  }
  enableInputAirportShuttle() {
    if (this.serviceFormGroup.controls.airportShuttle.value === true) {
      this.serviceFormGroup.controls.airportShuttlePrice.enable();
    } else {
      this.serviceFormGroup.controls.airportShuttlePrice.disable();
    }
  }

  enableInputSauna() {
    if (this.serviceFormGroup.controls.sauna.value === true) {
      this.serviceFormGroup.controls.saunaPrice.enable();
    } else {
      this.serviceFormGroup.controls.saunaPrice.disable();
    }
  }

  // New Service

  newService: any[] = [];

  addService() {
    this.newService.push({ name: '', price: '', status: false });
  }

  @ViewChild('stepper') stepper!: MatStepper;
  removeService(i: any) {
    this.newService.splice(i, 1);
  }

  step1() {
    this.stepper.selectedIndex = 0;
  }
  step5() {
    this.stepper.selectedIndex = 4;
  }
  step6() {
    this.stepper.selectedIndex = 5;
  }

  // Register Image
  file!: File;
  homestayLicenseFiles: File[] = [];
  homestayImageFiles: File[] = [];

  // image name file
  public homestayLicense!: string;
  public homestayImages: any[] = [];

  // lấy file hình
  onSelectHomestayLicense(files: any) {
    console.log('onselect: ', files);
    // set files
    this.homestayLicenseFiles.push(...files.addedFiles);
    console.log('file array', this.homestayLicenseFiles);
    console.log('file lenght', this.homestayLicenseFiles.length);

    if (this.homestayLicenseFiles.length > 1) {
      this.homestayLicenseFiles.splice(
        this.homestayLicenseFiles.indexOf(files),
        1
      );
    }
    if (
      this.homestayImageFiles.length >= 1 ||
      this.homestayLicenseFiles.length == 1
    ) {
      this.informationFormGroup.patchValue({ homestayLicense: true });
    } else {
      this.informationFormGroup.patchValue({ homestayLicense: false });
    }
  }

  // xóa file hình
  onRemoveHomestayLicense(event: File) {
    console.log(event);
    console.log('xoa index:', this.homestayLicenseFiles.indexOf(event));
    this.homestayLicenseFiles.splice(
      this.homestayLicenseFiles.indexOf(event),
      1
    );
    console.log('xoa file:', this.homestayLicenseFiles);
    if (
      this.homestayImageFiles.length >= 1 &&
      this.homestayLicenseFiles.length == 1
    ) {
      this.informationFormGroup.patchValue({ homestayLicense: true });
    } else {
      this.informationFormGroup.patchValue({ homestayLicense: false });
    }
  }

  // lấy file hình
  onSelectImageHomestay(files: any) {
    console.log('onselect: ', files);
    // set files
    this.homestayImageFiles.push(...files.addedFiles);
  }
  // validate image
  validImageHomestay() {
    this.flag = false;
    if (this.homestayImageFiles.length < 5) {
      this.message = 'Upload at least 5 photos of your homestay';
      this.openDialogMessage();
      return;
    } else {
      this.flag = true;
      this.stepper.next();
    }
  }
  // xóa file hình
  onRemoveHomestayImage(event: File) {
    console.log(event);
    this.homestayImageFiles.splice(this.homestayImageFiles.indexOf(event), 1);
    console.log('xoa file:', this.homestayImageFiles);
    this.validImageHomestay();
  }

  // Price
  public price = 0;
  public priceTax: any;
  calcPriceTax(event: any) {
    var priceToFixed = (this.price * 0.95).toFixed();
    this.priceTax = priceToFixed;
  }
  validPrice() {
    if (this.price === 0) {
      this.message =
        'Please Set the price per night for this homestay and more than 0';
      this.openDialogMessage();
      return;
    } else {
      this.flag = true;
      this.stepper.next();
    }
  }

  // register submit
  result: string = '';

  // autocomplete
  // autocomplete Prediction
  place: any;

  filteredOptions!: Observable<predictions[]>;
  predictions: any;

  public getAutocomplete(event: any): void {
    type predictions = Array<{ description: string }>;
    this.place = event.target.value;
    this.httpGoong.getAutoCompletePlaces(this.place).subscribe((data) => {
      console.log(data);
      const predictions: predictions = data['predictions'];
      this.predictions = predictions;
      console.log(this.predictions);
    });
  }
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;
  @ViewChild('formField') autoCompleteFormField!: MatFormField;
  ngAfterViewInit() {
    var observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting)
          console.log('Element is is not in screen');
        this.autocomplete.closePanel();
      },
      { threshold: [1] }
    );

    observer.observe(this.autoCompleteFormField._elementRef.nativeElement);
  }
  // validate
  flag = false;
  // submit
  register() {
    console.log('register');
    // homestay Image
    for (this.file of this.homestayImageFiles) {
      const path =
        'homestay/' +
        this.informationFormGroup.controls.homestayName.value +
        ' ' +
        this.file.name;
      const fileRef = this.storage.ref(path);
      this.storage.upload(path, this.file);
      this.homestayImages.push({
        imageUrl:
          this.informationFormGroup.controls.homestayName.value +
          ' ' +
          this.file.name,
      });
    }

    // homestayLicenseFiles
    for (this.file of this.homestayLicenseFiles) {
      const path =
        'license/' +
        this.informationFormGroup.controls.homestayName.value +
        ' ' +
        this.file.name;
      const fileRef = this.storage.ref(path);
      this.storage.upload(path, this.file);
      this.homestayLicense =
        this.informationFormGroup.controls.homestayName.value +
        ' ' +
        this.file.name;
    }
    console.log(this.homestayImages);
    for (let f of this.homestayServices) {
      if (!f.price) {
        this.homestayServices[this.homestayServices.indexOf(f)].price = 0;
      }
    }

    if (this.flag === true) {
      this.httpHomestay
        .createHomestay(
          this.homestayName,
          this.address,
          this.totalRoom + '',
          this.homestayLicense,
          this.homestayImages,
          this.homestayServices,
          this.homestayFacilities,
          this.price.toString(),
          this.roomCapacity,
          this.homestayRules
        )
        .subscribe(
          (data) => {
            this.result = 'Register Homestay Success';
            this.message = 'Register Homestay Success';
            this.openDialogSuccess();
            setTimeout(() => {
              this.router.navigate(['/Landlord/Homestay/HomestayList'], {
                relativeTo: this.route,
              });
            }, 3000);
          },
          (error) => {
            this.result = error;
            this.message = error;
            this.openDialogMessage();
          }
        );
    }
  }
  message!: string;
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
}

export class predictions {
  description!: string;
}
