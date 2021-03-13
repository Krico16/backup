import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListPageModule),
      },
      {
        path: 'details/:id',
        loadChildren: () =>
          import('./details/details.module').then((m) => m.DetailsPageModule),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./favorites/favorites.module').then((m) => m.FavoritesPageModule),
      },
      {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
      },
      {
        path: 'details',
        redirectTo: '/menu/list',
        pathMatch: 'full',
      },
      {
        path: '',
        redirectTo: '/menu/list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule { }
