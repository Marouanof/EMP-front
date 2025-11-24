import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
  },
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./components/layout/layout').then(m => m.Layout),
    canActivate: [authGuard],
    children: [
      {
        path: 'employees',
        loadComponent: () => import('./components/employee-list/employee-list').then(m => m.EmployeeList)
      },
      {
        path: 'employees/new',
        loadComponent: () => import('./components/employee-form/employee-form').then(m => m.EmployeeForm)
      },
      {
        path: 'employees/edit/:id',
        loadComponent: () => import('./components/employee-form/employee-form').then(m => m.EmployeeForm)
      }
    ]
  }
];
