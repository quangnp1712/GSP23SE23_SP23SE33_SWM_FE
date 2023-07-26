import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatFormField } from '@angular/material/form-field';
import { MessageComponent } from '../../../pop-up/message/message.component';
import { SuccessComponent } from '../../../pop-up/success/success.component';
import { GoongService } from '../../../services/goong.service';
import { HomestayService } from '../../../services/homestay.service';

@Component({
  selector: 'app-register-bloc-homestay',
  templateUrl: './register-bloc-homestay.component.html',
  styleUrls: ['./register-bloc-homestay.component.scss'],
})
export class RegisterBlocHomestayComponent implements OnInit, AfterViewInit {
  data!: Data;
  isEdit = false;
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private httpGoong: GoongService,
    private httpHomestay: HomestayService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {}

  st1Property:boolean = false;
  st2Homestay:boolean=false;

  // information
  informationFormGroup = this._formBuilder.group({
    blocHomestayName: ['', Validators.required],
    address: ['', Validators.required],
    homestayLicense: [false, Validators.requiredTrue],
  });

  // bloc homestay
  isHomestayLicense: boolean = false;
  informationForm() {
    this.flag = false;
    this.st1Property = false;
    console.log(this.informationFormGroup.value);
    console.log(this.homestayLicenseFiles.length);
    this.isHomestayLicense =
      this.informationFormGroup.controls.homestayLicense.value!;
    if (this.informationFormGroup.controls.blocHomestayName.value == '') {
      this.message = 'Please enter Bloc homestay name';
      this.openDialogMessage();
      return;
    } else if (this.informationFormGroup.controls.address.value == '') {
      this.message = 'Please enter address';
      this.openDialogMessage();
      return;
    } else if (!this.isHomestayLicense) {
      this.message = 'Please upload at a photo of your Homestay License';
      this.openDialogMessage();
      return;
    } else {
      this.result = '';
      this.flag = true;
      this.st1Property=true;
      this.stepper.next();
    }
  }

  // homestays
  // information
  homestayInformationFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    room: ['', Validators.required],
    price: ['', Validators.required],
    roomCapacity: ['', Validators.required],
  });

  //  homestay
  homestayInformationForm() {
    this.validPrice();
    this.st2Homestay = false;
    console.log(this.homestayInformationFormGroup.value);
    if (this.homestayInformationFormGroup.controls.name.value == '') {
      this.message = 'Please enter Homestay name';
      this.openDialogMessage();
      return;
    } else if (this.homestayInformationFormGroup.controls.room.value == '') {
      this.message = 'Please enter Available rooms';
      this.openDialogMessage();
      return;
    } else if ( parseInt(this.homestayInformationFormGroup.controls.room.value!) > 100) {
      this.message = 'Total room must be less than 100';
      this.openDialogMessage();
      return;
    } else if ( parseInt(this.homestayInformationFormGroup.controls.roomCapacity.value!) > 20) {
      this.message = 'Room capacity must be less than 20';
      this.openDialogMessage();
      return;
    }else if (this.homestayInformationFormGroup.controls.price.value == '') {
      this.message = 'Please enter price';
      this.openDialogMessage();
      return;
    } else {
      this.result = '';
      this.flag = true;
      this.st2Homestay = true;
      this.stepper2.next();
    }
  }

  // Facility
  facilityFormGroup = this._formBuilder.group({
    tv: false,
    tvAmount: [{ value: '', disabled: true }],
    wifi: false,
    wifiAmount: [{ value: '', disabled: true }],
    fan:false,
    wardrobe:false,
    table:false,
    chair:false,
    airCondition: false,
    fanAmount: [{ value: '', disabled: true }],
    wardrobeAmount: [{ value: '', disabled: true }],
    tableAmount: [{ value: '', disabled: true }],
    chairAmount: [{ value: '', disabled: true }],
    airConditionAmount: [{ value: '', disabled: true }],
  });
  homestayFacilities: Array<{ name: string; quantity: number }> = [];
  commonFacilities = {
    tv: false,
    tvAmount: '',
    wifi: false,
    wifiAmount: '',
    fan:false,
    fanAmount:'',
    wardrobe:false,
    wardrobeAmount:'',
    table:false,
    tableAmount:'',
    chair:false,
    chairAmount:'',
    airCondition:false,
    airConditionAmount:'',
  };
  facilityForm() {
    this.homestayFacilities = [];
    if (this.facilityFormGroup.controls.tv.value == true) {
      this.homestayFacilities.push({
        name: 'tv',
        quantity: this.facilityFormGroup.controls['tvAmount']
          .value as unknown as number,
      });
    }
    if (this.facilityFormGroup.controls.wifi.value == true) {
      this.homestayFacilities.push({
        name: 'wifi',
        quantity: this.facilityFormGroup.controls['wifiAmount']
          .value as unknown as number,
      });
    }
     // fan
     if(this.facilityFormGroup.controls.fan.value == true){
      this.homestayFacilities.push({name:'fan', quantity:this.facilityFormGroup.controls['fanAmount'].value as unknown as number})
    }

    // wardrobe
    if(this.facilityFormGroup.controls.wardrobe.value == true){
      this.homestayFacilities.push({name:'wardrobe', quantity:this.facilityFormGroup.controls['wardrobeAmount'].value as unknown as number})
    }

    // table
    if(this.facilityFormGroup.controls.table.value == true){
      this.homestayFacilities.push({name:'table', quantity:this.facilityFormGroup.controls['tableAmount'].value as unknown as number})
    }

    // chair
    if(this.facilityFormGroup.controls.chair.value == true){
      this.homestayFacilities.push({name:'chair', quantity:this.facilityFormGroup.controls['chairAmount'].value as unknown as number})
    }


    // common facility
    this.commonFacilities = {
      tv: this.facilityFormGroup.controls.tv.value!,
      tvAmount: this.facilityFormGroup.controls['tvAmount'].value as string,

      wifi: this.facilityFormGroup.controls.wifi.value!,
      wifiAmount: this.facilityFormGroup.controls['wifiAmount'].value as string,

      fan: this.facilityFormGroup.controls.fan.value!,
      fanAmount: this.facilityFormGroup.controls['fanAmount'].value as string,

      wardrobe: this.facilityFormGroup.controls.wardrobe.value!,
      wardrobeAmount: this.facilityFormGroup.controls['wardrobeAmount'].value as string,

      table: this.facilityFormGroup.controls.table.value!,
      tableAmount: this.facilityFormGroup.controls['tableAmount'].value as string,

      chair: this.facilityFormGroup.controls.chair.value!,
      chairAmount: this.facilityFormGroup.controls['chairAmount'].value as string,

      airCondition: this.facilityFormGroup.controls.airCondition.value!,
      airConditionAmount: this.facilityFormGroup.controls['airConditionAmount'].value as string,
    };

    for (let items of this.newFacility) {
      if (items.status) {
        this.homestayFacilities.push({
          name: items.name,
          quantity: items.price,
        });
      }
    }
    console.log(this.homestayFacilities);

    this.stepper2.next();
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
    this.newFacility.push({ name: '', status: false, price: 1 });
    console.log(this.newFacility);
  }
  removeFacility(i: any) {
    this.newFacility.splice(i, 1);
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
    console.log(this.houseRuleFormGroup.value);
    this.flag = false;
    if (this.houseRuleFormGroup.value['pet'] === true) {
      this.homestayRules.push({ description: 'Pet allowed' });
    }
    if (this.houseRuleFormGroup.value['smoking'] === true) {
      this.homestayRules.push({ description: 'Smoking allowed' });
    }
    if (this.houseRuleFormGroup.value['children'] === true) {
      this.homestayRules.push({ description: 'Children allowed' });
    }
    if (this.houseRuleFormGroup.value['party'] === true) {
      this.homestayRules.push({ description: 'Parties/envents allowed' });
    }

      this.result = '';
      this.flag = true;
      // this.stepper.selectedIndex = 2;
      this.stepper.next();

    console.log(this.homestayRules);
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
        } else {valid = true;
        this.homestayServices.push({name:items.name, price:items.price});}
      }
    } else {
      valid = true;
    }

    this.blocShow = false;
    this.overviewShow = true;
    this.homestayShow = false;
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
  removeService(i: any) {
    this.newService.splice(i, 1);
  }

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('stepper2') stepper2!: MatStepper;
  step1() {
    this.stepper.selectedIndex = 0;
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
    // set files
    this.homestayLicenseFiles.push(...files.addedFiles);

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
    this.homestayLicenseFiles.splice(
      this.homestayLicenseFiles.indexOf(event),
      1
    );

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

      return true;
    }
  }
  // xóa file hình
  onRemoveHomestayImage(event: File) {
    this.homestayImageFiles.splice(this.homestayImageFiles.indexOf(event), 1);

    this.validImageHomestay();
  }

  // Price
  public price = 0;
  public priceTax: any;
  calcPriceTax(event: any) {
    var priceToFixed = (this.price * 0.95).toFixed();
    this.priceTax = priceToFixed;
    this.homestayInformationFormGroup.controls.price.setValue(
      this.price as unknown as string
    );
  }
  validPrice() {
    if (this.price <= 0) {
      this.message =
        'Please Set the price per night for this homestay and more than 0';
      this.openDialogMessage();
      return;
    } else this.flag = true;
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
      const predictions: predictions = data['predictions'];
      this.predictions = predictions;
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
  // autocomplete

  homestays: {
    name: string;
    availableRooms: number;
    roomCapacity: number;
    price: number;
    homestayFacilities: any[];
    homestayImages: any[];
  }[] = [];

  homestaysDetail: {
    name: string;
    room: number;
    price: number;
    roomCapacity: number;
    commonFacility: any;
    addFacility: any[];
    imageFile: File[];
  }[] = [];

  addHomestay() {
    this.blocShow = false;
    this.overviewShow = false;
    this.homestayShow = true;
    this.price = 0;
    this.homestayInformationFormGroup.reset();
    this.facilityFormGroup.reset();
    this.facilityFormGroup.controls.tvAmount.disable();
    this.facilityFormGroup.controls.wifiAmount.disable();
    this.facilityFormGroup.controls.fanAmount.disable();
    this.facilityFormGroup.controls.wardrobeAmount.disable();
    this.facilityFormGroup.controls.tableAmount.disable();
    this.facilityFormGroup.controls.chairAmount.disable();
    this.facilityFormGroup.controls.airConditionAmount.disable();
    this.newFacility = [];
    this.homestayImageFiles = [];
    this.priceTax = 0;
    this.homestayImages = [];
    this.stepper2.reset();
  }
  removeHomestay(i: any) {
    this.homestays.splice(i, 1);
    this.overviewHomestays.splice(i, 1);
    this.homestaysDetail.splice(i, 1);
    console.log('remove');
    console.log('homestays', this.homestays);
    console.log('overviewHomestays', this.overviewHomestays);
    console.log('homestaysDetail', this.homestaysDetail);
  }

  overviewHomestays: {
    name: string;
    room: number;
    price: number;
    roomCapacity: number;
    imageUrl: File;
  }[] = [];
  isLinear = true;

// save homestay
  setHomestay() {
    this.isLinear = false;
    if (this.validImageHomestay() == true) {
      this.blocShow = false;
      this.overviewShow = true;
      this.homestayShow = false;
      if (this.isEdit == false) {
        console.log(this.isEdit);
        if (this.homestayImageFiles.length != 0) {
          for (this.file of this.homestayImageFiles) {
            this.homestayImages.push({ imageUrl:  this.homestayInformationFormGroup.controls.name.value + ' ' + this.file.name });
          }
          this.homestays.push({
            name: this.homestayInformationFormGroup.controls.name.value + '',
            availableRooms: parseInt(
              this.homestayInformationFormGroup.controls.room.value!
            ),
            roomCapacity: parseInt(
              this.homestayInformationFormGroup.controls.roomCapacity.value!
            ),
            price: parseInt(
              this.homestayInformationFormGroup.controls.price.value!
            ),
            homestayFacilities: this.homestayFacilities,
            homestayImages: this.homestayImages,
          });

          this.overviewHomestays.push({
            name: this.homestayInformationFormGroup.controls.name.value + '',
            room: parseInt(
              this.homestayInformationFormGroup.controls.room.value!
            ),
            roomCapacity: parseInt(
              this.homestayInformationFormGroup.controls.roomCapacity.value!
            ),
            price: parseInt(
              this.homestayInformationFormGroup.controls.price.value!
            ),
            imageUrl: this.homestayImageFiles[0],
          });
          this.homestaysDetail.push({
            name: this.homestayInformationFormGroup.controls.name.value + '',
            room: parseInt(
              this.homestayInformationFormGroup.controls.room.value!
            ),
            roomCapacity: parseInt(
              this.homestayInformationFormGroup.controls.roomCapacity.value!
            ),
            price: parseInt(
              this.homestayInformationFormGroup.controls.price.value!
            ),
            commonFacility: this.commonFacilities,
            addFacility: this.newFacility,
            imageFile: this.homestayImageFiles,
          });

          console.log('homestay:', this.homestays);
          console.log('homestaysDetail:', this.homestaysDetail);
        } else {
          this.validImageHomestay();
        }
      } else {
        console.log(this.isEdit);
        if (this.homestayImageFiles.length != 0) {
          this.homestays[this.index].name = this.homestayInformationFormGroup
            .controls.name.value as string;
          this.homestays[this.index].availableRooms = this
            .homestayInformationFormGroup.controls.room
            .value as unknown as number;
          this.homestays[this.index].roomCapacity = this
            .homestayInformationFormGroup.controls.roomCapacity
            .value as unknown as number;
          this.homestays[this.index].price = this.homestayInformationFormGroup
            .controls.price.value as unknown as number;
          this.homestays[this.index].homestayFacilities =
            this.homestayFacilities;
          this.homestays[this.index].homestayImages = this.homestayImages;

          this.overviewHomestays[this.index].name = this
            .homestayInformationFormGroup.controls.name.value as string;
          this.overviewHomestays[this.index].room = this
            .homestayInformationFormGroup.controls.room
            .value as unknown as number;
          this.overviewHomestays[this.index].roomCapacity = this
            .homestayInformationFormGroup.controls.roomCapacity
            .value as unknown as number;
          this.overviewHomestays[this.index].price = this
            .homestayInformationFormGroup.controls.price
            .value as unknown as number;
          this.overviewHomestays[this.index].imageUrl =
            this.homestayImageFiles[0];

          this.homestaysDetail[this.index].name = this
            .homestayInformationFormGroup.controls.name.value as string;
          this.homestaysDetail[this.index].room = this
            .homestayInformationFormGroup.controls.room
            .value as unknown as number;
          this.homestaysDetail[this.index].roomCapacity = this
            .homestayInformationFormGroup.controls.roomCapacity
            .value as unknown as number;
          this.homestaysDetail[this.index].price = this
            .homestayInformationFormGroup.controls.price
            .value as unknown as number;
          this.homestaysDetail[this.index].commonFacility =
            this.commonFacilities;
          this.homestaysDetail[this.index].addFacility = this.newFacility;
          this.homestaysDetail[this.index].imageFile = this.homestayImageFiles;

          console.log('homestay:', this.homestays);
          console.log('homestaysDetail:', this.homestaysDetail);
        } else {
          this.validImageHomestay();
        }
      }
    }
  }


  index: any;

  getHomestayDetail(i: any) {
    this.blocShow = false;
    this.overviewShow = false;
    this.homestayShow = true;
    this.index = i;
    this.isEdit = true;
    this.price = 0;
    this.priceTax = 0;
    this.homestayInformationFormGroup.reset();
    this.facilityFormGroup.reset();
    this.newFacility = [];
    this.homestayImageFiles = [];

    const detail = this.homestaysDetail[i];
    this.homestayInformationFormGroup.controls.name.setValue(detail.name);
    this.homestayInformationFormGroup.controls.room.setValue(
      detail.room as unknown as string
    );
    this.homestayInformationFormGroup.controls.roomCapacity.setValue(
      detail.roomCapacity as unknown as string
    );
    this.homestayInformationFormGroup.controls.price.setValue(
      detail.price as unknown as string
    );
    this.facilityFormGroup.controls.tv.setValue(detail.commonFacility.tv);
    this.facilityFormGroup.controls.tvAmount.setValue(
      detail.commonFacility.tvAmount
    );
    this.facilityFormGroup.controls.wifi.setValue(detail.commonFacility.wifi);
    this.facilityFormGroup.controls.wifiAmount.setValue(
      detail.commonFacility.wifiAmount
    );
    this.newFacility = detail.addFacility;
    this.homestayImageFiles = detail.imageFile;
    for (this.file of this.homestayImageFiles) {
      this.homestayImages.push({ imageUrl: this.file.name });
    }
    this.price = detail.price;
    console.log(this.isEdit);
    this.stepper2.selectedIndex = 0;
  }

  // validate
  flag = false;
  // submit
  register() {
    console.log('register');


    // homestayLicenseFiles
    for( this.file of this.homestayLicenseFiles){
      this.homestayLicense = this.informationFormGroup.controls.blocHomestayName.value +
      ' ' + this.file.name;
    }

    this.data = {
      address: '',
      businessLicense: '',
      homestayRules: [{ description: '' }],
      homestayServices: [{ name: '', price: 0 }],
      homestays: [
        {
          availableRooms: 0,
          homestayFacilities: [{ name: '', quantity: 0 }],
          homestayImages: [{ imageUrl: '' }],
          name: '',
          price: 0,
          roomCapacity:0
        },
      ],
      name: '',
    };

    this.data.name = this.informationFormGroup.controls.blocHomestayName
      .value as string;
    this.data.address = this.informationFormGroup.controls.address
      .value as string;
      this.data.businessLicense = this.homestayLicense;
    this.data.homestayRules = this.homestayRules;
    this.data.homestayServices = this.homestayServices;
    this.data.homestays = this.homestays;
    console.log('data', this.data);
    console.log('homestays', this.homestays);



    if (this.flag === true && this.data.homestays.length > 0) {
      this.httpHomestay.createBloc(this.data).subscribe(
        (data) => {
          for (this.file of this.homestayLicenseFiles) {
            const path =
              'license/' +
              this.informationFormGroup.controls.blocHomestayName.value +
              ' ' +
              this.file.name;
            const fileRef = this.storage.ref(path);
            this.storage.upload(path, this.file);
          }
          for (let items of this.homestaysDetail) {
            for (this.file of items.imageFile) {
              const path = 'homestay/' + items.name + ' ' + this.file.name;
              const fileRef = this.storage.ref(path);
              this.storage.upload(path, this.file);
            }
          }

          this.message = 'Register Homestay Success';
          this.openDialogSuccess();
          setTimeout(() =>{
            this.router.navigate(['/Landlord/BlockHomestay/BlockHomestayList'], {
              relativeTo: this.route,
            });
         }, 4000);

        },
        (error) => {
          this.message = error;
          this.openDialogMessage();
        }
      );
    } else if (this.data.homestays.length == 0) {
      this.message = 'Please add more one homestay';
      this.openDialogMessage();
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

  // is show time
  blocShow = true;
  overviewShow = false;
  homestayShow = false;

  // over view bloc homestay

  blocHomestayDetail() {
    this.blocShow = true;
    this.overviewShow = false;
    this.homestayShow = false;
    this.step1();
  }
}
export class predictions {
  description!: string;
}

export interface Data {
  address: string;
  businessLicense: string;
  homestayRules: Array<{ description: string }>;
  homestayServices: Array<{ name: string; price: number }>;
  homestays: Array<{
    availableRooms: number;
    homestayFacilities: Array<{ name: string; quantity: number }>;
    homestayImages: Array<{ imageUrl: string }>;
    name: string;
    price: number;
    roomCapacity: number;
  }>;
  name: string;
}
