import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/_services/customer.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

   regCustomerFm:FormGroup;
   myCustomer:Customer;
   loading = false;
   submitted = false;
   myType:any= ["Work","Home"];
   data:any;

  constructor(private customerService:CustomerService,private fb:FormBuilder,private router:Router) {
          this.myCustomer=new Customer();
          this.myCustomer.address=new Address();
   }

  ngOnInit(): void {
    this.regCustomerFm=this.fb.group({
      lastName:[''],
	    firstName:[''],
	    emailAddress:[''],
      password:[''],
      confirmPassword:[''],
      cellNumber:[''],
      addressFrm:this.fb.group({
      streetName: [''],
      city: [''],
      country: [''],
      postalCode: [''],
      type: [''],       
      })
    });

  }


  


 


  submit(){
     this.submitted=true;
     

var customer={
       'firstName':this.regCustomerFm.get("firstName").value,
       'password':this.regCustomerFm.get("password").value,
       'lastName':this.regCustomerFm.get("lastName").value,
       'emailAddress':this.regCustomerFm.get("emailAddress").value,
       'cellNumber':this.regCustomerFm.get("cellNumber").value,
       'address':{'streetName':this.regCustomerFm.get("addressFrm.streetName").value,
                   'city':this.regCustomerFm.get("addressFrm.city").value,
                   'country':this.regCustomerFm.get("addressFrm.country").value,
                   'postalCode':this.regCustomerFm.get("addressFrm.postalCode").value,
                   'type':this.regCustomerFm.get("addressFrm.type").value
                   }
     }

    

    
    this.loading=true;

    this.customerService.registerCustomer(customer)
     .pipe(first()).
      subscribe(
               (response)=>{

                 

                 localStorage.setItem('data',response);

                 //console.log(localStorage.getItem('data'));

                 this.router.navigate(['/login']);
               },(error)=>{

                     if(error.status==200){
                      
                      //localStorage.setItem('customerData',error.text);
                      //console.log(localStorage.getItem('customerData'));

                      this.router.navigate(['/login']);
                     }
                     this.loading=false;
                     console.log(error);
                    
               }     
     );


  }


}
