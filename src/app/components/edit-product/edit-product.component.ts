import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product:Product;
  editProductFm:FormGroup;
  loading = false;
  submitted = false;
  categories:any= ["fruit","vege"];
  data:any;
  myproductId:any;
  sub: Subscription;

  constructor(private route: ActivatedRoute,private router:Router,private productService:ProductService,private fb:FormBuilder) { 
       this.product=new Product();
       this.product.category=new ProductCategory(); 
  }

  ngOnInit(): void {


    this.editProductFm=this.fb.group({
      productName:[''],
	    productDescription:[''],
	    categoryName:[''],
      productRating:[''],
      price:[''],
      productIngredients:[''],
      quantityOnHand:[''],
      image:['']

    });
    
     
    this.sub=this.route.params.subscribe(params=>{

      this.myproductId=params['productId'];
      
      if(this.myproductId){
      
        this.productService.getProduct(this.myproductId).subscribe((data) => {
          this.product=(data);
          //this.myCustomer.address=(data.address);
           console.log("my product :",JSON.stringify(this.product));
        }, (error) =>{
        
          if(error.status==200){
          }
          if (this.product=== undefined || this.product== null) {
                console.log(error);
            }
        });

      }else{
        console.log(Error); 
      }


    });

  }

    updateProduct(productId,product){

      this. submitted = true;



    this.loading=true;
    this.productService.updateProduct(productId,product)
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

                      this.router.navigate(['/product']);
                     }
                     this.loading=false;
                     console.log(error);
                    
               }     
     );


    }


  

}
