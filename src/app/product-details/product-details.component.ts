import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity:number=1;
  quantity:number=1;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        console.warn(result);
        this.productData = result;
      });
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;

    }else if (this.productQuantity >1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
}
