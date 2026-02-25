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
    { label: 'Dashboard', iconName: 'heroBriefcase', route: '/dashboard' },
    { label: 'Pets', iconName: 'heroHeart', route: '/pets' },
    { label: 'Tutores', iconName: 'heroUsers', route: '/tutores' },
    { label: 'Agendamentos', iconName: 'heroCalendarDays', route: '/appointments' },
    { label: 'Financeiro', iconName: 'heroCreditCard', route: '/financial' },
    { label: 'Relatórios', iconName: 'heroDocumentChartBar', route: '/reports' }
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
