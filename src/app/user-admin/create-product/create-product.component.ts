import { Component } from '@angular/core';
import { FormControl, FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  

  constructor(
    private productService: ProductService,
    private  router : Router
    
  ) {
  }
  form = new FormGroup({
    category: new FormControl('', []),
    name: new FormControl('', []),
    imageUrl: new FormControl('', []),
    price: new FormControl('', []),
    quantity: new FormControl('', []),
    description: new FormControl('', [])
  })


  get category() {
    return this.form.get("category")
  }
  get name() {
    return this.form.get('name');
  }
  get imageUrl() {
    return this.form.get('imageUrl');
  }

  get price() {
    return this.form.get('price');
  }

  get quantity() {
    return this.form.get('quantity')
  }

  get description() {
    return this.form.get('description')
  }

  createProduct(): void {
    this.productService.createProduct(this.form.value).subscribe(
      ({
        next: (data) => {
         this.router.navigate(['/admin'])
         console.log(data)
        },
        error: (err) => {
          console.log(err)
        }
      })
      
    )
    console.log(this.form.value)

  }

}
