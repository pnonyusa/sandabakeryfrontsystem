import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ProductService } from 'src/app/_services/product.service';
import {Product} from 'src/app/models/product'

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products:Array<Product>;
  loading = false;
  submitted = false;

  constructor(private router:Router,private productService :ProductService) { 

  
  }

  ngOnInit(): void {

    this.productService.getProducts(0,11).subscribe((data) => {
      this.products=(data);
      //this.myCustomer.address=(data.address);
       console.log("my product :",JSON.stringify(data));
    }, (error) =>{
    
      if(error.status==200){
      }
      if (this.products=== undefined || this.products== null) {
            console.log(error);
        }
    });

  }

}
