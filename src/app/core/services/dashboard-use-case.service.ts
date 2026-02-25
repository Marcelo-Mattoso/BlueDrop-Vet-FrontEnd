/**
 * Dashboard Use Case Service
 * Layer: Application/MVC Controller
 * Orchestrates domain services and infrastructure for dashboard use cases
 */

import { Injectable, signal, computed } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { DashboardDomainService } from '../../domain/services';
import { DashboardApiService } from '../../infrastructure/services/dashboard-api.service';
import type { Pet } from '../../domain/entities/pet.entity';
import type { Appointment } from '../../domain/entities/appointment.entity';

export interface DashboardState {
  stats: {
    totalActivePets: number;
    totalTutors: number;
    appointmentsToday: number;
    revenueToday: number;
  };
  recentAppointments: Appointment[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardUseCaseService {
  private state = signal<DashboardState>({
    stats: {
      totalActivePets: 0,
      totalTutors: 0,
      appointmentsToday: 0,
      revenueToday: 0
    },
    recentAppointments: [],
    loading: true,
    error: null
  });

  // Computed signals for reactive updates
  stats = computed(() => this.state().stats);
  recentAppointments = computed(() => this.state().recentAppointments);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  constructor(
    private domainService: DashboardDomainService,
    private apiService: DashboardApiService
  ) {
    this.loadDashboard();
  }

  /**
   * Use Case: Load dashboard data
   */
  loadDashboard(): void {
    this.state.update(s => ({ ...s, loading: true, error: null }));

    this.apiService.getDashboardData()
      .pipe(
        tap(data => {
          const stats = (data.stats as any);
          this.state.update(s => ({
            ...s,
            stats: {
              totalActivePets: stats.activePets || stats.totalActivePets || 0,
              totalTutors: stats.tutors || stats.totalTutors || 0,
              appointmentsToday: stats.appointmentsToday || 0,
              revenueToday: stats.revenueToday || 0
            },
            recentAppointments: data.recentAppointments as Appointment[],
            loading: false
          }));
        }),
        catchError(error => {
          this.state.update(s => ({
            ...s,
            loading: false,
            error: 'Erro ao carregar dashboard'
          }));
          throw error;
        })
      )
      .subscribe();
  }

  /**
   * Use Case: Refresh dashboard data
   */
  refreshDashboard(): Observable<any> {
    this.state.update(s => ({ ...s, loading: true }));
    return this.apiService.getDashboardData().pipe(
      tap(data => {
        this.state.update(s => ({
          ...s,
          stats: {
            totalActivePets: (data.stats as any).activePets || (data.stats as any).totalActivePets || 0,
            totalTutors: (data.stats as any).tutors || (data.stats as any).totalTutors || 0,
            appointmentsToday: data.stats.appointmentsToday || 0,
            revenueToday: data.stats.revenueToday || 0
          },
          recentAppointments: data.recentAppointments,
          loading: false
        }));
      }),
      catchError(error => {
        this.state.update(s => ({
          ...s,
          loading: false,
          error: 'Erro ao atualizar dashboard'
        }));
        throw error;
      })
    );
  }
}
