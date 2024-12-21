
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Interface/category,model';
import { Product } from 'src/app/Interface/store.model';

import { AdminService } from 'src/app/services/admin.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: Product | undefined;
  form: FormGroup = new FormGroup({});

  categories: Category[] = [];
  selectedCategoryId: string |undefined
  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]]  
    });
    this.storeService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
      
      
      if (this.storeService.getCategories.length > 0) {
        this.selectedCategoryId = this.categories[0]._id;
      }
    });
    this.fetchProduct();
   
  }

  fetchProduct(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.adminService.getProduct(id).subscribe(product => {
      if (product) {
        this.form.patchValue({
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          description: product.description,
          quantity: product.quantity
        });
        this.product = product;
      } else {
        // Handle case when product is not found
        console.error('Product not found');
      }
    });
  }

  updateProduct(): void {
    const id = this.activateRoute.snapshot.params['id'];
    if (this.form.valid) {
      this.adminService.updateProduct(id, this.form.value).subscribe({
        next: (data) => {
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error updating product:', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}