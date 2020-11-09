import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-update-customer-profile',
  templateUrl: './update-customer-profile.component.html',
  styleUrls: ['./update-customer-profile.component.css']
})
export class UpdateCustomerProfileComponent implements OnInit {

  updateCustomerFm:FormGroup;
   myCustomer:Customer;
   
   loading = false;
   submitted = false;
   myType:any= ["Work","Home"];
   data:any;
   myCustomerId:any;
  sub: Subscription;

  constructor(private route: ActivatedRoute,private customerService:CustomerService,private fb:FormBuilder,private router:Router) { 
         this.myCustomer=new Customer();
          this.myCustomer.address=new Address();
  }

  ngOnInit(): void {

    this.updateCustomerFm=this.fb.group({
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



     
    this.sub=this.route.params.subscribe(params=>{

      this.myCustomerId=params['customerId'];
      
      if(this.myCustomerId){
      
        this.customerService.getUserDetail(this.myCustomerId).subscribe((data) => {
          this.myCustomer=(data);
          //this.myCustomer.address=(data.address);
           console.log("my customer :",JSON.stringify(this.myCustomer));
        }, (error) =>{
        
          if(error.status==200){

            console.log("my customer :",JSON.stringify(this.myCustomer));
          }
          if (this.myCustomer=== undefined || this.myCustomer== null) {
                console.log(error);
            }
        });

      }else{
        console.log(Error); 
      }


    });
  }




  submit(){

   this.submitted=true;


   this.loading=true;
   this.customerService.updateCustomer(this.myCustomerId,this.myCustomer)
   .pipe(first()).
      subscribe(
               (response)=>{
                 
                    console.log("my response",response);

                    this.router.navigate(['/list-customers']);

               },(error)=>{
                  
                if(error.status=200){

                  this.router.navigate(['/list-customers']);
                }

                this.loading=false;
                console.log(error);

               }
      );



  }

}
