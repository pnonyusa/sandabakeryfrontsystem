import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {

  myCustomer:Array<Customer>;

  constructor(private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
      
    this.customerService.getUserDetails(0,11).subscribe((data) => {
      this.myCustomer=(data);
      //this.myCustomer.address=(data.address);
       console.log("my payments :"+data);
    }, (error) =>{
    
      if(error.status==200){
      }
      if (this.myCustomer=== undefined || this.myCustomer.length== 0) {
            console.log(error);
        }
    });

  }

}
