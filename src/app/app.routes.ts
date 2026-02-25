import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'tutores', component: DashboardComponent },
  { path: 'pets', component: DashboardComponent },
  { path: 'agenda', component: DashboardComponent },
  { path: 'financeiro', component: DashboardComponent },
  { path: 'configuracoes', component: DashboardComponent },
];
