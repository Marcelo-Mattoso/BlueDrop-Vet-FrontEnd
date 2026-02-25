/**
 * Sidebar Component
 * Layer: Presentation/View
 * Standalone component for side navigation
 */

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

interface MenuItem {
  label: string;
  iconName: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', iconName: 'heroicons/outline/briefcase', route: '/dashboard' },
    { label: 'Pets', iconName: 'heroicons/outline/heart', route: '/pets' },
    { label: 'Tutores', iconName: 'heroicons/outline/users', route: '/tutores' },
    { label: 'Agendamentos', iconName: 'heroicons/outline/calendar-days', route: '/appointments' },
    { label: 'Financeiro', iconName: 'heroicons/outline/credit-card', route: '/financial' },
    { label: 'Relatórios', iconName: 'heroicons/outline/document-chart-bar', route: '/reports' }
  ];

  private router = inject(Router);
  activeRoute = signal(this.router.url);

  navigate(route: string): void {
    this.router.navigate([route]);
    this.activeRoute.set(route);
  }

  isActive(route: string): boolean {
    return this.activeRoute().startsWith(route);
  }
}
