import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppSettings } from '../_helper/app-settings';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient,private tokenStorage:TokenStorageService) { }

   header = new HttpHeaders({'Authorization':'Bearer '+this.tokenStorage.getToken()});
  addProduct(product){
   
    return this.httpClient.post<any>(`${AppSettings.BASE_URL}/product/admin/addproduct`,product,{headers : this.header}).
      pipe(map((response)=>{return response}));

  }


  getProducts(page,limit){
 
    return this.httpClient.get<any>(`${AppSettings.BASE_URL}/product?page=${page}&limit=${limit}`,{headers:this.header})
    .pipe(map((response)=> { return response; }));
  }

  updateProduct(productId,product){
  
    return this.httpClient.put<any>(`${AppSettings.BASE_URL}/product/admin/updateproduct/${productId}`,product,{headers:this.header}).
            pipe(map(x=>{
                   if(productId!=null){
                       
                    localStorage.setItem("userData",JSON.stringify(productId));
  
                   }
  
                   return x
            }));
            
  }


  getProduct(productId){
    
    return this.httpClient.get<any>(`${AppSettings.BASE_URL}/product/${productId}`,{headers:this.header})
    .pipe(map((response)=> { return response; }));
  }


  deleteProduct(productId){
    
    return this.httpClient.delete<any>(`${AppSettings.BASE_URL}/product/admin/deleteProduct/${productId}`,{headers:this.header})
    .pipe(map((response)=> { return response; }));

  }

}
