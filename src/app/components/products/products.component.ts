import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
      quantityOnHand:['']
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
      'quantityOnHand':+this.productFm.get("quantityOnHand").value
    }


    
    
    
    this.loading=true;
  }

}
