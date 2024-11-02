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

  // Функция за зареждане на продуктите
  loadProducts(): void {
    this.storeService.getProducts(this.limit).subscribe({
      next: (data) => {
        this.storeslist = data; // Запълваме списъка с продукти
      },
      error: (err) => {
        console.error('Error loading products', err);
      },
    });
  }

  // Функция за съкращаване на описанията (ако вече не е имплементирана)
  truncateText(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}
