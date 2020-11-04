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

  

registerCustomer(customer){
  
  var header = new HttpHeaders({'Content-Type':'application/json'});
  return this.httpClient.post<any>(`${AppSettings.BASE_URL}/customers/signup`,customer,{headers : header}).
    pipe(map((response)=>{return response}));

}



updateCustomer(customerId,customer){
  var header = new HttpHeaders({'Content-Type':'application/json'});

  return this.httpClient.put<any>(`${AppSettings.BASE_URL}/update/${customerId}`,customer,{headers:header}).
          pipe(map(x=>{
                 if(customerId!=null){
                     
                  localStorage.setItem("userData",JSON.stringify(customer));

                 }

                 return x
          }));
          
}


getUserDetails(page,limit){
  var header = new HttpHeaders({'Content-Type':'application/json'});
  return this.httpClient.get<any>(`${AppSettings.BASE_URL}/customers?page=${page}&limit=${limit}`,{headers:header})
  .pipe(map((response)=> { return response; }));
}

getUserDetail(emailAddress){
  var header = new HttpHeaders({'Content-Type':'application/json'});
  return this.httpClient.get<any>(`${AppSettings.BASE_URL}/customers/${emailAddress}`,{headers:header})
  .pipe(map((response)=> { return response; }));
}




}
