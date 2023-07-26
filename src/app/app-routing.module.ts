import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLandlordComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { ForgotPassComponent } from './guest/forgot-pass/forgot-pass.component';
import { WelcomePageComponent } from './guest/welcome-page/welcome-page.component';
import { AdminComponent } from './admin/admin.component';
import { LandlordComponent } from './landlord/landlord.component';
import { LandlordModule } from './landlord/landlord.module';
import { TestComponent } from './test/test/test.component';
import { TestTwoComponent } from './test/test-two/test-two.component';
import { TestThreeComponent } from './test/test-three/test-three.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { BalanceSuccessComponent } from './pop-up/balance-success/balance-success.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'Homepage', component: WelcomePageComponent },
  { path: 'Login', component: LoginLandlordComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'ForgotPassword', component: ForgotPassComponent },
  { path: 'Admin', component: AdminComponent, canActivate: [AuthGuard] },
  {
    path: 'Admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'Admin',
    loadChildren: () =>
      import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
  { path: 'Landlord', component: LandlordComponent, canActivate: [AuthGuard] },
  {
    path: 'Landlord',
    loadChildren: () =>
      import('./landlord/landlord.module').then((m) => m.LandlordModule),
  },
  {
    path: 'Landlord',
    loadChildren: () =>
      import('./landlord/landlord-routing.module').then((m) => m.LandlordRoutingModule),
  },
  {
    path: 'Test',
    component: TestComponent
  },
  {
    path: 'Test2',
    component: TestTwoComponent
  },
  {
    path: 'Test3',
    component: TestThreeComponent
  },
  {
    path: 'Profile',
    component: ProfileComponent
  },
  {
    path: 'Success',
    component: BalanceSuccessComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
