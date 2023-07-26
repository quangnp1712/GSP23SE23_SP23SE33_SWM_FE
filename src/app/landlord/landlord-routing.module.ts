import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomestayComponent } from './homestay/homestay.component';
import { LandlordComponent } from './landlord.component';

import { RegisterBlocHomestayComponent } from './homestay/register-bloc-homestay/register-bloc-homestay.component';
import { RegisterHomestayComponent } from './homestay/register-homestay/register-homestay.component';
import { CategoryHomestayComponent } from './homestay/category-homestay/category-homestay.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../auth.guard';
import { HomestayDetailComponent } from './homestay/homestay-detail/homestay-detail.component';
import { BlocHomestayDetailComponent } from './homestay/bloc-homestay-detail/bloc-homestay-detail.component';
import { BlocHomestayComponent } from './bloc-homestay/bloc-homestay.component';
import { BookingComponent } from './manage-booking/booking/booking.component';
import { DashboardLandlordComponent } from './dashboard-landlord/dashboard-landlord.component';
import { PromotionDetailComponent } from './promotion/promotion-detail/promotion-detail.component';
import { PromotionOverviewComponent } from './promotion/promotion-overview/promotion-overview.component';
import { PromotionCreateComponent } from './promotion/promotion-create/promotion-create.component';
import { CheckInOutComponent } from './manage-booking/checkinout/check-in-out.component';
import { HistoryBookingComponent } from './manage-booking/history-booking/history-booking.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LandlordComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'Dashboard',
        component: DashboardLandlordComponent,
      },
      {
        path: 'Category',
        component: CategoryHomestayComponent,
      },
      {
        path: 'Category',
        children: [
          {
            path: 'RegisterHomestay',
            component: RegisterHomestayComponent,
          },
          {
            path: 'RegisterBlocHomestay',
            component: RegisterBlocHomestayComponent,
          },
        ],
      },

      {
        path: 'Homestay',
        children: [
          {
            path: 'HomestayDetail',
            component: HomestayDetailComponent,
          },
          {
            path: 'HomestayList',
            component: HomestayComponent,
          },
          {
            path: 'HomestayCreate',
            component: RegisterHomestayComponent,
          },
        ],
      },
      {
        path: 'BlockHomestay',
        children: [
          {
            path: 'BlockHomestayDetail',
            component: BlocHomestayDetailComponent,
          },
          {
            path: 'BlockHomestayList',
            component: BlocHomestayComponent,
          },
          {
            path: 'BlockHomestayCreate',
            component: RegisterBlocHomestayComponent,
          },
        ],
      },
      {
        path: 'Profile',
        component: ProfileComponent,
      },
      {
        path: 'Booking',
        children: [
          {
            path: 'BookingList',
            component: BookingComponent,
          },
          {
            path: 'CheckInOut',
            component: CheckInOutComponent,
          },
          {
            path: 'BookingHistory',
            component: HistoryBookingComponent,
          },
        ],
      },
      {
        path: 'Promotion',
        children: [
          {
            path: 'PromotionDetail',
            component: PromotionDetailComponent,
          },
          {
            path: 'PromotionOverview',
            component: PromotionOverviewComponent,
          },
          {
            path: 'PromotionCreate',
            component: PromotionCreateComponent,
          },
        ],
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandlordRoutingModule {}
