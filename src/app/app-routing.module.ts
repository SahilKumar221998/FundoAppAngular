import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationGuard } from './AuthGuard/authentication.guard';

const routes: Routes = [{path:"",component:LoginComponent},
  {path:"signUp",component:SignupComponent},
  {path:"dashboard",component:DashboardComponent ,canActivate: [AuthenticationGuard]}];
   
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
