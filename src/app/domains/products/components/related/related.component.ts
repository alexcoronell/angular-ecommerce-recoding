import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductComponent } from '../product/product.component';

import { ProductService } from '@shared/services/product.service';

import { Product } from '@shared/models/product.model';

interface ProductRequest {
  product_slug?: string;
}

@Component({
  selector: 'app-related',
  imports: [ProductComponent],
  templateUrl: './related.component.html',
})
export class RelatedComponent {
  private productService = inject(ProductService);
  $slug = input.required<string>({ alias: 'slug' });

  public productsResource = rxResource<Product[], ProductRequest>({
    params: () => ({ product_slug: this.$slug() }),
    stream: ({ params }) => this.productService.getRelatedProducts(params),
  });
}
