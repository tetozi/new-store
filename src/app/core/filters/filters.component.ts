import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Category } from 'src/app/Interface/category,model';
import { Product } from 'src/app/Interface/store.model';


import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<Product[]>();
  categories: Category[] = [];
  selectedCategory: any;

  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.storeService.getCategories().subscribe({
      next: (data) => {
        this.categories = data; // Запълване на категориите с получените данни
      },
      error: (err) => {
        console.error('Error loading categories', err);
      },
    });
  }

  onCategoryChange(event: MatSelectionListChange) {
    const selectedCategoryId = event.options[0].value;
    if (selectedCategoryId) {
      console.log('Selected category:', selectedCategoryId);
      this.getCategoryProducts(selectedCategoryId); // Извикване на функцията за зареждане на продуктите
    } else {
      console.error('No category selected');
    }
  }

  // Got all products for this category
  getCategoryProducts(categoryId: string) {
    this.storeService.getCategory(categoryId).subscribe((category) => {
      if (category && category.products) {
        // Send to Home Component
        this.showCategory.emit(category.products);
      } else {
        console.error('No products found for this category');
        // Make empty array with products
        this.showCategory.emit([]); 
      }
    });
  }
}