import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { HeaderProductComponent } from './header-product/header-product.component';
import { FiltersComponent } from './filters/filters.component';
import { RouterModule } from '@angular/router';

import { PaginationComponent } from './pagination/pagination.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    HeaderProductComponent,
    FiltersComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,

  ],
  exports:[
    HeaderComponent,
    HomeComponent,
    HeaderProductComponent,
    FiltersComponent,
    
  ]
})
export class CoreModule { }
