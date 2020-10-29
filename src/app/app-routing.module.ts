import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordPageComponent } from './components/forgot-password-page/forgot-password-page.component';
import { ContactpageComponent } from './components/Home/contactpage/contactpage.component';
import { HomepageComponent } from './components/Home/homepage/homepage.component';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';


const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'contact', component: ContactpageComponent },
{path:'home',component:HomepageComponent},
{path:'login',component:LoginPageComponent},
{path:'register',component:RegisterPageComponent},
{path:'forgot-password',component:ForgotPasswordPageComponent},
{path:'list-customers',component:ListCustomersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
