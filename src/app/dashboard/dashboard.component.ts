import { Component } from '@angular/core';

interface StatCard {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface Appointment {
  id: number;
  pet: {
    name: string;
    id: string;
    breed: string;
    avatar: string;
  };
  tutor: {
    name: string;
    responsible?: string;
  };
  service: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1 class="dashboard-greeting">Olá, Marcelo 👋</h1>
        <p class="dashboard-location">BlueDrop Pets - Campinas</p>
      </div>

      <div class="stats-grid">
        @for (stat of stats; track stat.label) {
          <div class="stat-card">
            <div class="stat-card-content">
              <div class="stat-icon" [class.blue]="stat.color === 'blue'" [class.green]="stat.color === 'green'">
                <span class="icon material-symbols-outlined">{{ stat.icon }}</span>
              </div>
              <div class="stat-info">
                <div class="stat-label">{{ stat.label }}</div>
                <div class="stat-value">{{ stat.value }}</div>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="recent-section">
        <div class="recent-header">
          <h2 class="recent-title">Atendimentos recentes</h2>
          <a href="#" class="ver-todos">
            Ver todos
            <span class="icon material-symbols-outlined">chevron_right</span>
          </a>
        </div>

        <table class="appointments-table">
          <thead>
            <tr>
              <th>Pet</th>
              <th>Tutor</th>
              <th>Serviço</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            @for (appointment of appointments; track appointment.id) {
              <tr>
                <td>
                  <div class="pet-info">
                    <div class="pet-avatar">{{ appointment.pet.avatar }}</div>
                    <div class="pet-details">
                      <span class="pet-name">
                        {{ appointment.pet.name }}
                        <span style="color: #9ca3af; font-size: 12px">
                          ({{ appointment.pet.id }})
                        </span>
                      </span>
                      <span class="pet-breed">{{ appointment.pet.breed }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="tutor-name">{{ appointment.tutor.name }}</div>
                  @if (appointment.tutor.responsible) {
                    <div class="tutor-responsible">
                      {{ appointment.tutor.responsible }}
                    </div>
                  }
                </td>
                <td class="service-cell">{{ appointment.service }}</td>
                <td class="date-cell">
                  {{ appointment.date }}<br />
                  {{ appointment.time }}
                </td>
              </tr>
            }
          </tbody>
        </table>

        <div class="recent-footer">
          <a href="#" class="ver-todos">
            Ver todos
            <span class="icon material-symbols-outlined">chevron_right</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
    }

    .dashboard-header {
      margin-bottom: 32px;
    }

    .dashboard-greeting {
      font-size: 32px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 8px;
    }

    .dashboard-location {
      font-size: 16px;
      color: #6b7280;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .stat-card-content {
      display: flex;
      align-items: flex-start;
      gap: 16px;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon .icon {
      display: flex;
      font-size: 24px;
      line-height: 1;
    }

    .stat-icon.blue {
      background-color: #dbeafe;
      color: #3b82f6;
    }

    .stat-icon.green {
      background-color: #d1fae5;
      color: #10b981;
    }

    .stat-info {
      flex: 1;
    }

    .stat-label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .stat-value {
      font-size: 32px;
      font-weight: 600;
      color: #1f2937;
    }

    .recent-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .recent-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .recent-title {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
    }

    .ver-todos {
      color: #3b82f6;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: color 0.2s;
    }

    .ver-todos:hover {
      color: #2563eb;
    }

    .ver-todos .icon {
      display: flex;
      font-size: 16px;
      line-height: 1;
    }

    .appointments-table {
      width: 100%;
      border-collapse: collapse;
    }

    .appointments-table thead {
      border-bottom: 1px solid #e5e7eb;
    }

    .appointments-table th {
      text-align: left;
      padding: 12px 16px;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .appointments-table td {
      padding: 16px;
      border-bottom: 1px solid #f3f4f6;
    }

    .appointments-table tbody tr:hover {
      background-color: #f9fafb;
    }

    .pet-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .pet-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e5e7eb;
      font-size: 20px;
    }

    .pet-details {
      display: flex;
      flex-direction: column;
    }

    .pet-name {
      font-weight: 500;
      color: #1f2937;
      font-size: 14px;
    }

    .pet-breed {
      font-size: 12px;
      color: #9ca3af;
    }

    .tutor-name {
      font-size: 14px;
      color: #1f2937;
    }

    .tutor-responsible {
      font-size: 12px;
      color: #9ca3af;
    }

    .service-cell {
      color: #6b7280;
      font-size: 14px;
    }

    .date-cell {
      color: #6b7280;
      font-size: 14px;
    }

    .recent-footer {
      margin-top: 16px;
      text-align: center;
    }
  `]
})
export class DashboardComponent {
  stats: StatCard[] = [
    {
      label: 'Pets Ativos',
      value: '24',
      color: 'blue',
      icon: 'pets'
    },
    {
      label: 'Tutores',
      value: '18',
      color: 'blue',
      icon: 'group'
    },
    {
      label: 'Agendamentos Hoje',
      value: '5',
      color: 'blue',
      icon: 'calendar_month'
    },
    {
      label: 'Receita do Dia',
      value: 'R$ 250,00',
      color: 'green',
      icon: 'payments'
    },
  ];

  appointments: Appointment[] = [
    {
      id: 1,
      pet: {
        name: 'Valentina',
        id: 'ID 62527',
        breed: 'Shih Tzu',
        avatar: '🐕',
      },
      tutor: {
        name: 'Marcelo dos Santos Mattoso',
      },
      service: 'Consulta',
      date: '24/04/2024',
      time: '14:00',
    },
    {
      id: 2,
      pet: {
        name: 'Mel',
        id: 'Animal teste',
        breed: 'Buldogue francês',
        avatar: '🐕',
      },
      tutor: {
        name: 'Rosa Marlene',
        responsible: '(Responsável teste)',
      },
      service: '...',
      date: '23/04/2024',
      time: '10:30',
    },
  ];
}
