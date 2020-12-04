import{ProductCategory} from './product-category'
export class Product {
    productId:string;
    productName:string;
    productDescription:string;
    category:ProductCategory;
    productRating:string;
    productIngredients:string;
    image:string;
    price:number;
    quantityOnHand:number;
}
