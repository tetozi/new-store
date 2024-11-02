import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { AdminRouthingModule } from './admin-routing.moudule';
import {  FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';



@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminComponentComponent,
    SingleProductComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRouthingModule,
    ReactiveFormsModule,
    FormsModule
   
  ],
  exports : [
    AdminHomeComponent,
    AdminComponentComponent,
    SingleProductComponent,
    

  ]
})
export class UserAdminModule { }
