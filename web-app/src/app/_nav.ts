import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Management',
  },
  {
    name: 'Map',
    url: '/map',
    icon: 'fa fa-map'
  },
  {
    name: 'Marketplace',
    url: '/marketplace',
    icon: 'fa fa-shopping-cart'
  },
  {
    name: 'Inventory',
    url: '/inventory',
    icon: 'fa fa-sitemap'
  },
  {
    name: 'Datacenters',
    url: '/datacenters',
    icon: 'fa fa-cubes'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Other',
  },
  {
    name: 'Companies',
    url: '/companies',
    icon: 'fa fa-building'
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'fa fa-users'
  }
];
