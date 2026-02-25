import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [RouterLink],
    template: `
    <aside class="sidebar">
      @for (item of menuItems; track item.route) {
        <div 
          class="sidebar-item"
          [class.active]="isActive(item.route)"
          [routerLink]="item.route"
        >
          <span class="icon material-symbols-outlined">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </div>
      }
    </aside>
  `,
    styles: [`
    .sidebar {
      width: 250px;
      background-color: white;
      border-right: 1px solid #e5e7eb;
      padding: 32px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .sidebar-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 24px;
      color: #6b7280;
      font-size: 15px;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 3px solid transparent;
    }

    .sidebar-item:hover {
      background-color: #f9fafb;
      color: #3b82f6;
    }

    .sidebar-item.active {
      background-color: #eff6ff;
      color: #3b82f6;
      font-weight: 500;
      border-left: 3px solid #3b82f6;
    }

    .sidebar-item .icon {
      flex-shrink: 0;
      font-size: 20px;
      line-height: 1;
    }
  `]
})
export class SidebarComponent {
  private router = inject(Router);

  menuItems = [
    { route: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { route: '/home', label: 'Home', icon: 'home' },
    { route: '/tutores', label: 'Tutores', icon: 'group' },
    { route: '/pets', label: 'Pets', icon: 'pets' },
    { route: '/agenda', label: 'Agenda', icon: 'calendar_month' },
    { route: '/financeiro', label: 'Financeiro', icon: 'payments' },
    { route: '/configuracoes', label: 'Configurações', icon: 'settings' },
  ];

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
