import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpHeaderResponse,HttpRequest,HttpResponse } from '@angular/common/http';
import {observable} from 'rxjs';
import { AppSettings } from '../_helper/app-settings';
import {Customer} from '../models/customer';
import { map} from 'rxjs/operators'
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    

  constructor(private httpClient:HttpClient,private tokenStorage:TokenStorageService) {
   
   }

  

   header = new HttpHeaders({'Authorization':'Bearer '+this.tokenStorage.getToken()});



updateCustomer(customerId,customer){
  

  return this.httpClient.put<any>(`${AppSettings.BASE_URL}/users/admin/update/${customerId}`,customer,{headers:this.header}).
          pipe(map(x=>{
                 if(customerId!=null){
                     
                  localStorage.setItem("userData",JSON.stringify(customer));

                 }

                 return x
          }));
          
}


getUserDetails(){
  
  return this.httpClient.get<any>(`${AppSettings.BASE_URL}/users/admin/all`,{headers:this.header})
  .pipe(map((response)=> { return response; }));
}

getUserDetail(customerId){
  
  return this.httpClient.get<any>(`${AppSettings.BASE_URL}/users/${customerId}`,{headers:this.header})
  .pipe(map((response)=> { return response; }));
}



deleteCustomer(customerId){
  
  return this.httpClient.delete<any>(`${AppSettings.BASE_URL}/users/admin/delete/${customerId}`,{headers:this.header})
  .pipe(map((response)=>{return response}));
}




}
