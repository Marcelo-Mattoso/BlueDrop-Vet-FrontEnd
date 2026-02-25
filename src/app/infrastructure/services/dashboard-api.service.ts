/**
 * Dashboard API Service
 * Layer: Infrastructure/Data Access
 * Handles HTTP communication for Dashboard
 * 
 * NOTE: HttpClient implementation pending - using mock data for now
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DashboardResponse {
  stats: {
    activePets: number;
    tutors: number;
    appointmentsToday: number;
    revenueToday: number;
  };
  recentAppointments: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  /**
   * Get dashboard data (mock implementation)
   */
  getDashboardData(): Observable<DashboardResponse> {
    // TODO: Replace with actual HTTP call once HttpClient is properly resolved
    return of({
      stats: {
        activePets: 145,
        tutors: 89,
        appointmentsToday: 12,
        revenueToday: 1800
      },
      recentAppointments: []
    }).pipe(delay(500));
  }

  /**
   * Get dashboard stats (mock implementation)
   */
  getStats(): Observable<any> {
    return of({}).pipe(delay(300));
  }

  /**
   * Get recent appointments (mock implementation)
   */
  getRecentAppointments(limit: number = 10): Observable<any[]> {
    return of([]).pipe(delay(300));
  }
}
