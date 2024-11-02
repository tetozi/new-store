
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Interface/store.model';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Interface/category,model';

const apiUrl = 'http://localhost:4242';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) { }
/*
  getAllProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${apiUrl}/api/product${category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    );
  }
    */
  getProducts(limit: number, page: number = 1): Observable<Product[]> {
    const offset = (page - 1) * limit;
    return this.http.get<Product[]>(`${apiUrl}/api/product?limit=${limit}&offset=${offset}`);
  }
  getTotalProductsCount(): Observable<{ status: string, data: { totalProducts: number }  }> {
    return this.http.get<{status:string,data: { totalProducts: number } }>(`${apiUrl}/api/product/count`);  
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${apiUrl}/api/category`);
  }

// Got all products from category
  getCategory(categoryId: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/api/category/${categoryId}`);
  }
  }
