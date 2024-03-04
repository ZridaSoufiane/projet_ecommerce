import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products! : Array<Product>
  currentPage : number=0;
  pageSize : number=5;
  totalPages : number=0; 
  errorMessage! : String;
  searchFormGroup! : FormGroup;
  currentAction : string="all";

  constructor(private productService : ProductService, private fb : FormBuilder, public authService : AuthenticationService){}

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control(null)
    });
    this.handleGetPageProduct();
  }

  handleGetAllProduct(){
    this.productService.getAllProducts().subscribe({
      next: (data)=>{
        this.products=data;
      },
      error: (err)=>{
        this.errorMessage=err;
      }
    });
  }

  handleGetPageProduct(){
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next: (data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      },
      error: (err)=>{
        this.errorMessage=err;
      }
    });
  }

  handleDeleteProduct(p: Product) {
    let conf=confirm("are you sure ?");
    if(conf==false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next: (data)=>{
        let index=this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })
  }

  handleSetPromotion(p: Product) {
    this.productService.setPromotion(p.id).subscribe({
      next: (data)=>{
        p.promotion=!p.promotion;
      },
      error: err=>{this.errorMessage=err;}
    });
  }

  handleSearchProducts() {
    this.currentAction="search";
    this.currentPage=0;
    let keyword=this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      }
    })
  }

  goToPage(i: number) {
    this.currentPage=i;
    if(this.currentAction=="all")
      this.handleGetPageProduct();
    else
      this.handleSearchProducts();
  }
}
