import {  NgModule } from '@angular/core';
import { RouterModule,Routes  } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { CartComponent } from './shared/cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AdminComponentComponent } from './user-admin/admin-component/admin-component.component';
import { AuthGuard } from './auth.guard';


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
{ path: 'admin', loadChildren: () => import('./user-admin/admin-routing.moudule').then(m => m.AdminRouthingModule) },
{
  path: '**', pathMatch: 'full',
  component:PageNotFoundComponent
}


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
