import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { ContactpageComponent } from './components/Home/contactpage/contactpage.component';
import { HomepageComponent } from './components/Home/homepage/homepage.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { UpdateCustomerProfileComponent } from './components/update-customer-profile/update-customer-profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';


const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'contact', component: ContactpageComponent },
{path:'home',component:HomepageComponent},
{path:'login',component:LoginPageComponent},
{path:'register',component:RegisterPageComponent},
{path:'forgot-password',component:ForgotPasswordPageComponent},
{path:'list-customers',component:ListCustomersComponent},
{path:'product/add',component:ProductsComponent},
{path:'product',component:ListProductsComponent},
{path:'product/:productId',component:EditProductComponent},
{path:'customers/:customerId',component:UpdateCustomerProfileComponent},
{path:'admin-dashboard',component:AdminDashboardComponent},
{path:'customer-dashboard',component:UserDashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
