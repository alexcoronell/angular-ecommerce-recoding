import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(params: { category_id?: string; category_slug?: string }) {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (params.category_id) {
      url.searchParams.set('categoryId', params.category_id);
    }

    if (params.category_slug) {
      url.searchParams.set('categorySlug', params.category_slug);
    }

    return this.http.get<Product[]>(url.toString());
  }

  getOne(params: { product_id?: number; product_slug?: string }) {
    if (!params.product_id && !params.product_slug) {
      throw new Error('Either product_id or product_slug must be provided');
    }

    const endpoint = params.product_id
      ? `products/${params.product_id}`
      : `products/slug/${params.product_slug}`;
    const url = `${environment.apiUrl}/api/v1/${endpoint}`;
    console.log(url);
    return this.http.get<Product>(url);
  }

  getOneBySlug(params: { product_slug?: string }) {
    if (!params.product_slug) {
      throw new Error('product_slug must be provided');
    }

    const endpoint = `products/slug/${params.product_slug}`;
    const url = `${environment.apiUrl}/api/v1/${endpoint}`;
    console.log('params: ', params);
    console.log('URL: ', url);
    return this.http.get<Product>(url);
  }
}
