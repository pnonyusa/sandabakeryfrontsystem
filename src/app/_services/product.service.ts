import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppSettings } from '../_helper/app-settings';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  addProduct(product){
    var header = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post<any>(`${AppSettings.BASE_URL}/product/addproduct`,product,{headers : header}).
      pipe(map((response)=>{return response}));

  }


  getProducts(page,limit){
    var header = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.get<any>(`${AppSettings.BASE_URL}/product?page=${page}&limit=${limit}`,{headers:header})
    .pipe(map((response)=> { return response; }));
  }

  updateProduct(productId,product){
    var header = new HttpHeaders({'Content-Type':'application/json'});
  
    return this.httpClient.put<any>(`${AppSettings.BASE_URL}/product/updateproduct/${productId}`,product,{headers:header}).
            pipe(map(x=>{
                   if(productId!=null){
                       
                    localStorage.setItem("userData",JSON.stringify(productId));
  
                   }
  
                   return x
            }));
            
  }


  getProduct(productId){
    var header = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.get<any>(`${AppSettings.BASE_URL}/product/${productId}`,{headers:header})
    .pipe(map((response)=> { return response; }));
  }


  deleteProduct(productId){
    var header = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.delete<any>(`${AppSettings.BASE_URL}/product/deleteProduct/${productId}`,{headers:header})
    .pipe(map((response)=> { return response; }));

  }

}
