import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpHeaderResponse,HttpRequest,HttpResponse } from '@angular/common/http';
import {observable} from 'rxjs';
import { AppSettings } from '../_helper/app-settings';
import {Customer} from '../models/customer';
import { map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    

  constructor(private httpClient:HttpClient) {
   
   }

  





updateCustomer(customerId,customer){
  var header = new HttpHeaders({'Content-Type':'application/json'});

  return this.httpClient.put<any>(`${AppSettings.BASE_URL}/users/update/${customerId}`,customer,{headers:header}).
          pipe(map(x=>{
                 if(customerId!=null){
                     
                  localStorage.setItem("userData",JSON.stringify(customer));

                 }

                 return x
          }));
          
}


getUserDetails(page,limit){
  var header = new HttpHeaders({'Content-Type':'application/json'});
  return this.httpClient.get<any>(`${AppSettings.BASE_URL}/users/admin?page=${page}&limit=${limit}`,{headers:header})
  .pipe(map((response)=> { return response; }));
}

getUserDetail(customerId){
  var header = new HttpHeaders({'Content-Type':'application/json'});
  return this.httpClient.get<any>(`${AppSettings.BASE_URL}/users/${customerId}`,{headers:header})
  .pipe(map((response)=> { return response; }));
}



deleteCustomer(customerId){
  var header = new HttpHeaders({'Content-Type':'application/json'});
  return this.httpClient.delete<any>(`${AppSettings.BASE_URL}/users/admin/delete/${customerId}`,{headers:header})
  .pipe(map((response)=>{return response}));
}




}
