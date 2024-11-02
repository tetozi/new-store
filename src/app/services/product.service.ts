import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  createProduct(data: any): Observable<any> {
    return this.http.post('http://localhost:4242/api/product/create', data)
  }
}
