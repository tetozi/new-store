import {  NgModule } from '@angular/core';
import { RouterModule,Routes  } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { CartComponent } from './shared/cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [{
  path: 'home',
  component:HomeComponent
},
{
  path: '', redirectTo:'home', pathMatch:'full'
},
{
  path:'cart',component:CartComponent
},
{
  path: 'login', component:LoginComponent
},
{
  path: "register",component:RegisterComponent
},



];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
