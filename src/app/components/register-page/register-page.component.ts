import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { Address } from 'src/app/models/address';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/_services/auth.service';
import { CustomerService } from 'src/app/_services/customer.service';
import {MustMatchValidator} from 'src/app/_helper/must-match.validator';
import { ToastrService } from 'ngx-toastr';

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
   myRole:any=["admin","user"];
   data:any;

  constructor(private authService:AuthService,private fb:FormBuilder,private router:Router,private toastr:ToastrService) {
          this.myCustomer=new Customer();
         this.myCustomer.address=new Address();
   }

  ngOnInit(): void {
    this.regCustomerFm=this.fb.group({
      lastName:['',Validators.required],
	    firstName:['',Validators.required],
	    emailAddress:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      role:['',Validators.required],
      confirmPassword:['',[Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(10), Validators.maxLength(10)]],
      cellNumber:['',Validators.required],
      addressFrm:this.fb.group({
      streetName: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      postalCode: ['',[Validators.required,Validators.minLength(4)]],
      type: ['',Validators.required],       
      })
  },{
       validator:MustMatchValidator("password","confirmPassword")
  });

  this.onReset();

  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


 get formControls(){
         return this.regCustomerFm.controls;
 }
 


  submit(){


    if(this.regCustomerFm.valid){


      this.submitted=true;
     

      var customer={
             'firstName':this.regCustomerFm.get("firstName").value,
             'password':this.regCustomerFm.get("password").value,
             'lastName':this.regCustomerFm.get("lastName").value,
             'emailAddress':this.regCustomerFm.get("emailAddress").value,
             'cellNumber':this.regCustomerFm.get("cellNumber").value,
             'role':this.regCustomerFm.get("role").value,
             'address':{'streetName':this.regCustomerFm.get("addressFrm.streetName").value,
                         'city':this.regCustomerFm.get("addressFrm.city").value,
                         'country':this.regCustomerFm.get("addressFrm.country").value,
                         'postalCode':this.regCustomerFm.get("addressFrm.postalCode").value,
                         'type':this.regCustomerFm.get("addressFrm.type").value
                         }
           }
      
          
      
          
          this.loading=true;
      
          this.authService.registerCustomer(customer)
           .pipe(first()).
            subscribe(
                     (response)=>{
      
                       
      
                      this.toastr.success('you are successfully registered !!!','SUCCESS',{
                        timeOut:7000
                      });
      
                       this.router.navigate(['/login']);
                     },(error)=>{
      
                           if(error.status==200){
                            this.router.navigate(['/login']);
                           }
                           this.loading=false;
                           console.log(error);
                          
                     }     
           );
      
    }
      
 


  }


  onReset(){
    this.submitted=false;
    this.regCustomerFm.reset();
  }


}
