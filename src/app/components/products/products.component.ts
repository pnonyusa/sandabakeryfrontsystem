import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   productFm:FormGroup;
   loading = false;
   submitted = false;
   categories:any= ["fruit","vege"];
   data:any;

  constructor(private fb:FormBuilder,private router:Router,private productService :ProductService) { }

  ngOnInit(): void {
    
    this.productFm=this.fb.group({
      productName:[''],
	    productDescription:[''],
	    productCategory:[''],
      productRating:[''],
      price:[''],
      productIngredients:[''],
      quantityOnHand:[''],
      image:['']
    });

  }


  addProduct(){
    this.submitted=true;
     
    var product={
      'productName':this.productFm.get("productName").value,
      'productDescription':this.productFm.get("productDescription").value,
	    'productCategory':this.productFm.get("productCategory").value,
      'productRating':this.productFm.get("productRating").value,
      'price':+this.productFm.get("price").value,
      'productIngredients':this.productFm.get("productIngredients").value,
      'quantityOnHand':+this.productFm.get("quantityOnHand").value,
      'image':this.productFm.get("image").value
    }


    
    
    
    this.loading=true;


    this.productService.addProduct(product)
     .pipe(first()).
      subscribe(
               (response)=>{

                 console.log('data',response);

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
