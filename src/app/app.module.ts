import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './components/Home/homepage/homepage.component';
import { ContactpageComponent } from './components/Home/contactpage/contactpage.component';
import { NaviComponent } from './components/Home/navi/navi.component';
import { MyfooterComponent } from './components/Home/myfooter/myfooter.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { HttpClientModule } from '@angular/common/http';
import{CustomerService} from './_services/customer.service';
import{AuthService} from './_services/auth.service';
import{ProductService} from './_services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCustomerProfileComponent } from './components/update-customer-profile/update-customer-profile.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { ProductsComponent } from './components/products/products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { from } from 'rxjs';
import{TokenStorageService} from './_services/token-storage.service';
import{authInterceptorProviders}from './_helper/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ContactpageComponent,
    NaviComponent,
    MyfooterComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HeaderPageComponent,
    ForgotPasswordPageComponent,
    UpdateCustomerProfileComponent,
    ListCustomersComponent,
    ProductsComponent,
    ListProductsComponent,
    EditProductComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatCardModule, MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatGridListModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CustomerService,ProductService,AuthService,authInterceptorProviders,TokenStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
