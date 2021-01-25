import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  myCustomer:Array<Customer>;
  submitted:any=false;
  loading:any=false;
 

  constructor(private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
      
    this.customerService.getUserDetails().subscribe((data) => {
      this.myCustomer=(data);
      //this.myCustomer.address=(data.address);
       console.log("my payments :",JSON.stringify(data));
    }, (error) =>{
    
      if(error.status==200){
      }
      if (this.myCustomer=== undefined || this.myCustomer.length== 0) {
            console.log(error);
        }
    });
  }


  deleteCustomer(customerId):void{
       this.submitted=true;



       this.loading=true;

       this.customerService.deleteCustomer(customerId)
       .pipe(first()).subscribe(
         
             (response)=>{

                     console.log("customer",response)
             },(error)=>{

                 if(error.status=200){
                   
                  window.location.reload();

                  this.router.navigate(['/list-customers']);
                 }
                 this.loading=false;
                     console.log(error);
             }

       );


  }
  

}




