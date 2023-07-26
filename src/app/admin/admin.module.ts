import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { AdminComponent } from './admin.component';
import { RequestAccountLandlordComponent } from './request-account-landlord/request-account-landlord.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { matSelectAnimations, MatSelectModule } from '@angular/material/select';
import { MatPaginatedTabHeader, MatTabsModule } from '@angular/material/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccountLandlordDetailComponent } from './request-account-landlord/account-landlord-detail/account-landlord-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RequestHomestayComponent } from './request-homestay/request-homestay.component';

import { RequestBlocHomestayComponent } from './request-bloc-homestay/request-bloc-homestay.component';
import { HomestayDetailComponent } from './request-homestay/homestay-detail/homestay-detail.component';
import { BlocHomestayDetailComponent } from './request-bloc-homestay/bloc-homestay-detail/bloc-homestay-detail.component';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    AdminComponent,
    RequestAccountLandlordComponent,
    AccountLandlordDetailComponent,
    RequestHomestayComponent,
    RequestBlocHomestayComponent,
    HomestayDetailComponent,
    BlocHomestayDetailComponent,
    DashboardAdminComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    NgxPaginationModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatToolbarModule,
    MatDialogModule,
    MatBadgeModule,
    NgxDropzoneModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    CdkStepperModule,
    MatGridListModule,
    MatExpansionModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  ],
  providers: [
    MatDialog,
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class AdminModule {}
