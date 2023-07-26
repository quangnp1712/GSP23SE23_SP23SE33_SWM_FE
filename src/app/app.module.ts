// Module
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatDialogModule } from '@angular/material/dialog';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkScrollableModule, ScrollingModule} from '@angular/cdk/scrolling';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { NgxEchartsModule } from 'ngx-echarts';
// Component
import { AppComponent } from './app.component';
import { LoginLandlordComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { ForgotPassComponent } from './guest/forgot-pass/forgot-pass.component';
import { environment } from '../environments/environment';
import { WelcomePageComponent } from './guest/welcome-page/welcome-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActionPendingComponent } from './pop-up/action-pending/action-pending.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { DatePipe } from '@angular/common';
import { RegisterHomestayComponent } from './landlord/homestay/register-homestay/register-homestay.component';

import { TestComponent } from './test/test/test.component';
import { TestTwoComponent } from './test/test-two/test-two.component';
import { TestThreeComponent } from './test/test-three/test-three.component';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { SuccessComponent } from './pop-up/success/success.component';
import { MessageComponent } from './pop-up/message/message.component';
import { PendingHomestayComponent } from './pop-up/pending-homestay/pending-homestay.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingPendingComponent } from './pop-up/booking-pending/booking-pending.component';
import { BalanceSuccessComponent } from './pop-up/balance-success/balance-success.component';
import { BookingComponent } from './pop-up/booking/booking.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginLandlordComponent,
    RegisterComponent,
    ForgotPassComponent,
    WelcomePageComponent,
    ActionPendingComponent,
    TestComponent,
    TestTwoComponent,
    TestThreeComponent,
    SuccessComponent,
    MessageComponent,
    PendingHomestayComponent,
    ProfileComponent,
    BookingPendingComponent,
    BalanceSuccessComponent,
    BookingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,

    NgxDropzoneModule,
    MdbCarouselModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,

    MatRippleModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDialogModule,
    SocialLoginModule,
    MatTabsModule,
    NgxPaginationModule,
    MatStepperModule,
    CdkStepperModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MdbValidationModule,
    MdbFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatAutocompleteModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    CdkScrollableModule,


    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkScrollableModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,

    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '593303082715-id94ngomgp6rphoge2je8qakm1k0gco1.apps.googleusercontent.com'
            ),
          },
        ],

        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}

