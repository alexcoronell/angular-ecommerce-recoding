import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
} from '@angular/core';

import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';

import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { rxResource } from '@angular/core/rxjs-interop';

interface ProductRequest {
  category_slug?: string;
}

@Component({
  selector: 'app-list',
  imports: [ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  readonly slug = input<string>();

  //products = signal<Product[]>([]);
  //$categories = toSignal(this.categoryService.getAll(), { initialValue: [] });

  /* categoriesResouce = rxResource({
    loader: () => this.categoryService.getAll(),
  }); */

  categoriesResouce = resource({
    loader: () => this.categoryService.getAllPromise(),
  });

  productsResource = rxResource<Product[], ProductRequest>({
    params: () => ({ category_slug: this.slug() }),
    stream: ({ params }) => this.productService.getProducts(params),
  });

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  resetCategories() {
    this.categoriesResouce.set([]);
  }

  reloadCategories() {
    this.categoriesResouce.reload();
  }

  reloadProducts() {
    this.productsResource.reload();
  }
}
