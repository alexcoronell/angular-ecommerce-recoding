import {
  Component,
  inject,
  input,
  linkedSignal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';

import { RelatedComponent } from '@products/components/related/related.component';

import { ProductService } from '@shared/services/product.service';
import { MetaTagsService } from '@shared/services/meta-tags.service';
import { CartService } from '@shared/services/cart.service';

import { Product } from '@shared/models/product.model';

import { environment } from '@env/environment';

interface ProductRequest {
  product_slug?: string;
}

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage, RelatedComponent],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductDetailComponent {
  readonly slug = input<string>();
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private metaTagsService = inject(MetaTagsService);
  // $product = signal<Product | null>(null);

  constructor() {
    effect(() => {
      const product = this.productResource.value();
      if (product) {
        this.metaTagsService.updateMetaTags({
          title: product.title,
          description: product.description,
          image: product.images[0],
          url: `${environment.domain}/products/${product.slug}`,
        });
      }
    });
  }

  /* Way 1 */
  /* $cover = linkedSignal(() => {
    const product = this.product();
    if (product && product.images.length > 0) {
      return this.product()?.images[0];
    }
    return '';
  }); */

  productResource = rxResource<Product, ProductRequest>({
    params: () => ({ product_slug: this.slug() }),
    stream: ({ params }) => this.productService.getOneBySlug(params),
  });

  $cover = linkedSignal({
    source: () => this.productResource.value(),
    computation: (product, previousValue) => {
      if (product && product.images && product.images.length > 0) {
        return product.images[0];
      }
      return previousValue || '';
    },
  });

  /*   ngOnInit() {
    const slug = this.slug();
    if (slug) {
      this.productService.getOne({ product_slug: slug }).subscribe({
        next: product => {
          this.$product.set(product);
        },
      });
    }
  } */

  changeCover(newImg: string) {
    this.$cover.set(newImg);
  }

  addToCart() {
    const product = this.productResource.value();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
