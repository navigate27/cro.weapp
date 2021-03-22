import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { ApplyVipComponent } from './pages/apply-vip/apply-vip.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DropPointComponent } from './pages/drop-point/drop-point.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ServicePartnerComponent } from './pages/service-partner/service-partner.component';
import { SpBookingComponent } from './pages/sp-booking/sp-booking.component';
import { VipComponent } from './pages/vip/vip.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'booking-list', component: BookingListComponent },
  // { path: 'account', component: AccountComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'apply/vip', component: ApplyVipComponent },
  // { path: 'sp', component: ServicePartnerComponent },
  {
    path: 'vip',
    component: VipComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'ADMIN',
    },
  },
  // { path: 'dp', component: DropPointComponent },
  {
    path: 'sp-booking',
    component: SpBookingComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'SP',
    },
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
