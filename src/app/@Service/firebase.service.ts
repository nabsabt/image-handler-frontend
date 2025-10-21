import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ImageProduct,
  ImageProductDetails,
  Product,
} from '../@Inteface/Product.interface';
@Injectable()
export class FirebaseService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${environment.apiURL}/getProducts`);
  }

  public getImageProductList(): Observable<Array<ImageProduct>> {
    return this.http.get<Array<ImageProduct>>(
      `${environment.apiURL}/getImageProductList`
    );
  }

  public getImageProductDetails(id: number): Observable<ImageProductDetails> {
    return this.http.get<ImageProductDetails>(
      `${environment.apiURL}/getImageProduct/${id}`
    );
  }
}
