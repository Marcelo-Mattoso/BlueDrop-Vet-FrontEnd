import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/presentation/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'tutores', component: DashboardComponent },
  { path: 'pets', component: DashboardComponent },
  { path: 'appointments', component: DashboardComponent },
  { path: 'financial', component: DashboardComponent },
  { path: 'reports', component: DashboardComponent },
];
