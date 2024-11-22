import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
})
export class AdminHomeComponent implements OnInit {
  // save the products
  storeslist: any[] = [];
 limit = 12
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Got all products 
  loadProducts(): void {
    this.storeService.getProducts(this.limit).subscribe({
      next: (data) => {
        this.storeslist = data; 
      },
      error: (err) => {
        console.error('Error loading products', err);
      },
    });
  }

  // Limit the text 
  truncateText(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
