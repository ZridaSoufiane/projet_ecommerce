import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Array<Product>;

  constructor(private http: HttpClient) { 
  }

  public getAllProducts() : Observable<Array<Product>>{
    return this.http.get<any>(`http://localhost:8888/PRODUCT-SERVICE/products`);
  }

  public getPageProducts(page: number, size: number) : Observable<PageProduct>{
    let index = page*size;
    let totalPages = ~~(this.products.length/size);
    if(this.products.length % size != 0)
      totalPages++;
    let pageProducts = this.products.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProducts});
  }

  public deleteProduct(id: string): Observable<boolean>{
    return this.http.delete<any>(`http://localhost:8888/PRODUCT-SERVICE/products`);
  }

  public setPromotion(id: string) : Observable<boolean>{
    let product=this.products.find(p=>p.id=id);
    if(product != undefined){
      product.promotion!=product.promotion;
      return of(true);
    }
    else return throwError(()=>new Error("product not found"));
  }

  public searchProducts(keyword: string, products: Product[]): Observable<Product[]>{
    let filteredProducts=products.filter(p=>p.name.includes(keyword));
    return of(filteredProducts);
  }
}