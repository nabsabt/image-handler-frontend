import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './@Component/Productlist-component/product.list.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./@Component/home-component/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'productlist',
    loadComponent: () =>
      import('./@Component/Productlist-component/product.list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
