import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../Interface/store.model';
import { CartService } from '../../services/cart.service';
import { StoreService } from '../../services/store.service';

const ROWS_HEIGHT:{[id:number]: number} = {1:400,3: 335, 4: 350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  limit = 12;
  totalProducts: number = 0;
  category: string | undefined;
  itemsPerPage: number = 12;
  currentPage: number = 1;
  productsSubscription: Subscription | undefined
 

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadTotalProductsCount();  
   
  }
  // Reload limit kf the products of page
  onItemsUpdated(limit: number) {
    this.itemsPerPage = limit || 12;
    this.currentPage = 1
    this.loadProducts();  
  }
  
 // Reload new page 
 loadTotalProductsCount()  {
  this.storeService.getTotalProductsCount().subscribe(response => {
    if (response.status === "success"&& response.data) {
      
      this.totalProducts = response.data.totalProducts || 0;
    } else {
      this.totalProducts = 0; 
    }
    console.log('Total Products:', this.totalProducts);
  });
}

  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadProducts();  // Презареждане на продуктите за новата страница
  }
  onColumnsCountChange(event: number) {
    this.cols = event;
    this.rowHeight = ROWS_HEIGHT[this.cols]
    console.log('Cols value:', this.cols);
  }
  
  onSortChange(event: any) {
    console.log('Sort changed:', event);
    // Add your logic here
  }
  
  
  onShowCategory(products: Product[]): void {
    this.products = products;
  }

  loadProducts() {
    this.storeService.getProducts(this.itemsPerPage, this.currentPage).subscribe(products => {
      this.products = products;
    });
  }

  onAddToCart(product: Product): void {
    console.log(product)
    this.cartService.addToCart({
      product: product.imageUrl,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      id: product._id,
   
    });
  }
  truncateText(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
