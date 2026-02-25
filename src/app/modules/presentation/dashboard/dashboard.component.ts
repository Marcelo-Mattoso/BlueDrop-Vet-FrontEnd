/**
 * Dashboard Component
 * Layer: Presentation/View
 * Displays dashboard with stats and recent appointments
 */

import { Component, OnInit, signal, computed } from '@angular/core';
import { DashboardUseCaseService } from '../../../core/services';
import { NgIconComponent } from '@ng-icons/core';

interface StatCard {
  label: string;
  value: number;
  iconName: string;
  color: 'blue' | 'green' | 'orange' | 'purple';
  formatter?: (value: number) => string;
}

interface AppointmentRow {
  petName: string;
  petBreed: string;
  tutorName: string;
  service: string;
  date: string;
  time: string;
  avatar: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly recentAppointments = signal<AppointmentRow[]>([]);

  // Static stats for now (will be connected to service)
  private statsData = signal<StatCard[]>([
    {
      label: 'Pets Ativos',
      value: 145,
      iconName: 'heroHeart',
      color: 'blue'
    },
    {
      label: 'Tutores',
      value: 89,
      iconName: 'heroUsers',
      color: 'green'
    },
    {
      label: 'Agendamentos Hoje',
      value: 12,
      iconName: 'heroCalendarDays',
      color: 'orange'
    },
    {
      label: 'Receita do Dia',
      value: 1800,
      iconName: 'heroCreditCard',
      color: 'purple',
      formatter: (value) => `R$ ${value}`
    }
  ]);

  stats = computed(() => this.statsData());

  constructor(private dashboardUseCase: DashboardUseCaseService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    // Mock data for demo
    this.recentAppointments.set([
      {
        petName: 'Max',
        petBreed: 'Golden Retriever',
        tutorName: 'João Silva',
        service: 'Banho e Tosa',
        date: '25/02/2025',
        time: '09:00',
        avatar: '🐕'
      },
      {
        petName: 'Luna',
        petBreed: 'Poodle',
        tutorName: 'Maria Santos',
        service: 'Consulta Geral',
        date: '25/02/2025',
        time: '10:30',
        avatar: '🐩'
      }
    ]);
  }
}
