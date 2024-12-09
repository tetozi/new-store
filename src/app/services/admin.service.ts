import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stores } from '../Interface/productmodel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



const {apiUrl} = environment
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient)
   { }

   getProducts () {
    return this.http.get<Stores[]>(
      `${apiUrl}/api/admin`
    )
   }
   getProduct (id:string) {
    return this.http.get<Stores>(
      `${apiUrl}/api/admin/${id}`
    )
   }

   createProduct(data: any): Observable<any> {
    return this.http.post(`${apiUrl}api/admin/create`, data)
  }

   updateProduct(id:string,data: any) :Observable<any> {
    return this.http.patch<Stores>(`${apiUrl}/api/product/${id}`,data)
  }
}
