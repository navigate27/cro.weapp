import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './pages/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './pages/home/home.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { AccountComponent } from './pages/account/account.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandlingService } from './services/error-handling/error-handling.service';
import { ApplyVipComponent } from './pages/apply-vip/apply-vip.component';
import { ServicePartnerComponent } from './pages/service-partner/service-partner.component';
import { MatTableModule } from '@angular/material/table';
import { ServicePartnerDialogComponent } from './pages/service-partner/service-partner-dialog/service-partner-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { VipComponent } from './pages/vip/vip.component';
import { VipDialogComponent } from './pages/vip/vip-dialog/vip-dialog.component';
import { VipStatusComponent } from './pages/vip/vip-status/vip-status.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DropPointComponent } from './pages/drop-point/drop-point.component';
import { DropPointDialogComponent } from './pages/drop-point/drop-point-dialog/drop-point-dialog.component';
import { SpBookingComponent } from './pages/sp-booking/sp-booking.component';
import { SpBookingParcelDetailsComponent } from './pages/sp-booking/sp-booking-parcel-details/sp-booking-parcel-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SpBookingComponentComponent } from './components/table/sp-booking-component/sp-booking-component.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    BookingListComponent,
    AccountComponent,
    PageNotFoundComponent,
    LoginComponent,
    DashboardComponent,
    ApplyVipComponent,
    ServicePartnerComponent,
    ServicePartnerDialogComponent,
    ConfirmationDialogComponent,
    VipComponent,
    VipDialogComponent,
    VipStatusComponent,
    DropPointComponent,
    DropPointDialogComponent,
    SpBookingComponent,
    SpBookingParcelDetailsComponent,
    SpBookingComponentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlingService },
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
