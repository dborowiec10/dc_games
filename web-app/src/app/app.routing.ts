import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { ActivatorService } from './activator-service';

export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    canActivate: [ActivatorService],
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    canActivate: [ActivatorService],
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ActivatorService],
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [ActivatorService],
    children: [
      {
        path: 'companies',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/companies/companies.module').then(m => m.CompaniesModule)
      },
      {
        path: 'users',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'map',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/map/map.module').then(m => m.MapModule)
      },
      {
        path: 'marketplace',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/marketplace/marketplace.module').then(m => m.MarketplaceModule)
      },
      {
        path: 'inventory',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/inventory/inventory.module').then(m => m.InventoryModule)
      },
      {
        path: 'datacenters',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/datacenters/datacenters.module').then(m => m.DatacentersModule)
      },
      {
        path: 'base',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        canActivate: [ActivatorService],
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
