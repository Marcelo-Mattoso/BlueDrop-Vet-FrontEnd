import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent],
    template: `
    <div class="app">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-header></app-header>
        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .app {
      display: flex;
      min-height: 100vh;
      background-color: #f5f7fa;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .page-content {
      flex: 1;
      padding: 32px 40px;
      overflow-y: auto;
    }
  `]
})
export class AppComponent {
  title = 'BlueDrop Pets';
}
