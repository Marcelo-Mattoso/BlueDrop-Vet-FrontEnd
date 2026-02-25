/**
 * Dashboard Domain Service
 * Layer: Domain/Business Logic
 * Orchestrates dashboard data and statistics
 */

import { inject, Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import type { Pet } from '../entities/pet.entity';
import type { Tutor } from '../entities/tutor.entity';
import type { Appointment } from '../entities/appointment.entity';

export interface DashboardStats {
  totalActivePets: number;
  totalTutors: number;
  appointmentsToday: number;
  revenueToday: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardDomainService {
  /**
   * Calculate dashboard statistics from domain entities
   */
  calculateStats(
    pets: Pet[],
    tutors: Tutor[],
    appointments: Appointment[]
  ): DashboardStats {
    const activePets = pets.filter(p => p.isActive).length;
    const activeTutors = tutors.filter(t => t.isActive).length;
    const todayAppointments = appointments.filter(a => a.isToday()).length;
    
    // Revenue calculation (placeholder - would be calculated from service prices)
    const revenueToday = todayAppointments * 150; // R$ 150 per appointment (example)

    return {
      totalActivePets: activePets,
      totalTutors: activeTutors,
      appointmentsToday: todayAppointments,
      revenueToday: revenueToday
    };
  }

  /**
   * Get upcoming appointments for dashboard
   */
  getUpcomingAppointments(appointments: Appointment[], limit: number = 10): Appointment[] {
    return appointments
      .filter(a => a.isUpcoming())
      .sort((a, b) => new Date(a.getDateTime()).getTime() - new Date(b.getDateTime()).getTime())
      .slice(0, limit);
  }

  /**
   * Get today's appointments
   */
  getTodayAppointments(appointments: Appointment[]): Appointment[] {
    return appointments
      .filter(a => a.isToday())
      .sort((a, b) => a.time.localeCompare(b.time));
  }

  /**
   * Calculate occupancy rate
   */
  calculateOccupancyRate(
    appointmentsToday: number,
    operatingHours: number = 8,
    slotsPerHour: number = 4
  ): number {
    const totalSlots = operatingHours * slotsPerHour;
    return Math.round((appointmentsToday / totalSlots) * 100);
  }
}
