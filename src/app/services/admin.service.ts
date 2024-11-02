import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stores } from '../Interface/productmodel';
import { Observable } from 'rxjs';



const adminUrl = 'http://localhost:4242'
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient)
   { }

   getProducts () {
    return this.http.get<Stores[]>(
      `${adminUrl}/api/product`
    )
   }
   getProduct (id:string) {
    return this.http.get<Stores>(
      `${adminUrl}/api/product/${id}`
    )
   }

   updateProduct(id:string,data: any) :Observable<any> {
    return this.http.patch<Stores>(`${adminUrl}/api/product/${id}`,data)
  }
}
