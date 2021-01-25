import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppSettings } from '../_helper/app-settings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }





  registerCustomer(customer){
  
    var header = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.post<any>(`${AppSettings.BASE_URL}/users/signup`,customer,{headers : header}).
      pipe(map((response)=>{return response}));
  
  }


  signIn(credentials){
    var header = new HttpHeaders({'Content-Type':'application/json'
  });
    return this.httpClient.post<any>(`${AppSettings.BASE_URL}/users/login`,credentials,{headers : header}).
      pipe(map((response)=>{return response}));
  }


}
