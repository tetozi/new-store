import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { CreateProductComponent } from './create-product/create-product.component';



const routes: Routes = [
  { path: '', component: AdminComponentComponent, children: [
      { path: 'products', component: AdminHomeComponent },
      { path: 'products/single/:id', component: SingleProductComponent },
      { path: 'products/update/:id', component: UpdateProductComponent },
      { path: 'create', component: CreateProductComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRouthingModule { }
