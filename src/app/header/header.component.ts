import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [],
    template: `
    <header class="header">
      <div class="header-logo">
        <div class="logo-icon">🐾</div>
        <span class="logo-text">bluedrop</span>
        <span class="logo-text-gray">pets</span>
      </div>
      
      <div class="header-search">
        <span class="icon search-icon material-symbols-outlined">search</span>
        <input
          type="text"
          class="search-input"
          placeholder="Buscar tutores, pets, agendamentos..."
        />
      </div>

      <div class="header-actions">
        <button class="btn-novo-tutor">
          <span class="icon material-symbols-outlined">add</span>
          Novo Tutor
        </button>
        
        <button class="notification-btn">
          <span class="icon material-symbols-outlined">notifications</span>
        </button>
        
        <div class="user-avatar">M</div>
      </div>
    </header>
  `,
    styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 40px;
      background-color: white;
      border-bottom: 1px solid #e5e7eb;
      gap: 24px;
    }

    .header-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 600;
      color: #333;
      min-width: fit-content;
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
    }

    .logo-text {
      color: #3b82f6;
    }

    .logo-text-gray {
      color: #6b7280;
      font-weight: 400;
    }

    .header-search {
      flex: 1;
      max-width: 500px;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 12px 16px 12px 44px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      transition: all 0.2s;
    }

    .search-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .icon {
      font-size: 20px;
      line-height: 1;
    }

    .btn-novo-tutor {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background-color: #14b8a6;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      white-space: nowrap;
    }

    .btn-novo-tutor:hover {
      background-color: #0d9488;
    }

    .notification-btn {
      position: relative;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      color: #6b7280;
      transition: background-color 0.2s;
    }

    .notification-btn:hover {
      background-color: #f3f4f6;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .user-avatar:hover {
      transform: scale(1.05);
    }
  `]
})
export class HeaderComponent {}
