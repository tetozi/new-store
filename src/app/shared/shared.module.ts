import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'
import { MatBadgeModule } from '@angular/material/badge'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductBoxComponent } from './product-box/product-box.component';
import { CartComponent } from './cart/cart.component'

import { CreateProductComponent } from '../user-admin/create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';



const modules: any = [
  MatSidenavModule,
  MatGridListModule,
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule,
  MatToolbarModule,
  MatTableModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatInputModule


]

@NgModule({
  declarations: [
    ProductBoxComponent,
    CartComponent,
    CreateProductComponent,

   

  ],
  imports: [
    CommonModule,
    ...modules,
    ReactiveFormsModule,



  ],
  exports: [
    ...modules,
    ProductBoxComponent,
    CartComponent,
    CreateProductComponent,
   
  ]
})
export class SharedModule { }