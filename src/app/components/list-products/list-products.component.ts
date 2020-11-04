import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import {Product} from 'src/app/models/product'
import { first } from 'rxjs/operators';

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



  deleteProduct(productId){
     
    
    this. submitted = true;



    this.loading=true;
    this.productService.deleteProduct(productId)
     .pipe(first()).
      subscribe(
               (response)=>{

                 console.log('data',response);

                 //console.log(localStorage.getItem('data'));

                 this.router.navigate(['/product']);
               },(error)=>{

                     if(error.status==200){
                      
                      //localStorage.setItem('customerData',error.text);
                      //console.log(localStorage.getItem('customerData'));
                      window.location.reload();
                      this.router.navigate(['/product']);
                     }
                     this.loading=false;
                     console.log(error);
                    
               }     
     );

  }

}
