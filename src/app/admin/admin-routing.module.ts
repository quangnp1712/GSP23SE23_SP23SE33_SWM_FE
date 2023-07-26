import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RequestAccountLandlordComponent } from './request-account-landlord/request-account-landlord.component';
import { AccountLandlordDetailComponent } from './request-account-landlord/account-landlord-detail/account-landlord-detail.component';
import { RequestHomestayComponent } from './request-homestay/request-homestay.component';

import { RequestBlocHomestayComponent } from './request-bloc-homestay/request-bloc-homestay.component';
import { AuthGuard } from '../auth.guard';
import { HomestayDetailComponent } from './request-homestay/homestay-detail/homestay-detail.component';
import { BlocHomestayDetailComponent } from './request-bloc-homestay/bloc-homestay-detail/bloc-homestay-detail.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { TestComponent } from '../test/test/test.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,canActivateChild: [AuthGuard],
    children: [
      {
        path: 'Dashboard',
        component: DashboardAdminComponent,
      },
      {
        path: 'RequestAccountLandlord',
        component: RequestAccountLandlordComponent,
      },
      {
        path:'RequestAccountLandlord',
        children:[
          {
            path: 'AccountLandlordDetail',
            component: AccountLandlordDetailComponent
          }
        ]
      },
      {
        path: 'Homestay',
        component: RequestHomestayComponent,
      },
      {
        path:'Homestay',
        children:[
          {
            path: 'HomestayDetail',
            component: HomestayDetailComponent
          }
        ]
      },
      {
        path: 'BlockHomestay',
        component: RequestBlocHomestayComponent,
      },
      {
        path:'BlockHomestay',
        children:[
          {
            path: 'BlockHomestayDetail',
            component: BlocHomestayDetailComponent
          }
        ]
      },
      {
        path: 'Test',
        component: TestComponent,
      },
      {
        path: 'Chat',
        component: ChatComponent,
      },
      {
        path: 'Profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
