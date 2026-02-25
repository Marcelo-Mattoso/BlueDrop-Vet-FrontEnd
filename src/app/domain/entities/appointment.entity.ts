/**
 * Appointment Entity
 * Layer: Domain
 * Core domain logic for Appointment aggregate
 */

import type { AppointmentDTO } from '../../data/models';
import { AppointmentStatus } from '../../data/models';

export class Appointment {
  id: string;
  petId: string;
  tutorId: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: AppointmentDTO) {
    this.id = data.id;
    this.petId = data.petId;
    this.tutorId = data.tutorId;
    this.service = data.service;
    this.date = data.date;
    this.time = data.time;
    this.duration = data.duration;
    this.status = data.status;
    this.notes = data.notes;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Domain Logic: Check if appointment is in the past
   */
  isPast(): boolean {
    const appointmentDateTime = new Date(`${this.date}T${this.time}`);
    return appointmentDateTime < new Date();
  }

  /**
   * Domain Logic: Check if appointment is today
   */
  isToday(): boolean {
    const appointmentDate = new Date(this.date);
    const today = new Date();
    return (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    );
  }

  /**
   * Domain Logic: Check if appointment is upcoming (next 7 days)
   */
  isUpcoming(): boolean {
    const appointmentDate = new Date(this.date);
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return appointmentDate >= today && appointmentDate <= nextWeek;
  }

  /**
   * Domain Logic: Can be cancelled
   */
  canBeCancelled(): boolean {
    return (
      this.status !== AppointmentStatus.COMPLETED &&
      this.status !== AppointmentStatus.CANCELLED
    );
  }

  /**
   * Domain Logic: Can be completed
   */
  canBeCompleted(): boolean {
    return (
      this.status === AppointmentStatus.SCHEDULED ||
      this.status === AppointmentStatus.IN_PROGRESS
    );
  }

  /**
   * Domain Logic: Cancel appointment
   */
  cancel(): void {
    if (this.canBeCancelled()) {
      this.status = AppointmentStatus.CANCELLED;
      this.updatedAt = new Date();
    }
  }

  /**
   * Domain Logic: Complete appointment
   */
  complete(): void {
    if (this.canBeCompleted()) {
      this.status = AppointmentStatus.COMPLETED;
      this.updatedAt = new Date();
    }
  }

  /**
   * Domain Logic: Get status display name
   */
  getStatusDisplay(): string {
    const statusMap: Record<AppointmentStatus, string> = {
      [AppointmentStatus.SCHEDULED]: 'Agendado',
      [AppointmentStatus.IN_PROGRESS]: 'Em Andamento',
      [AppointmentStatus.COMPLETED]: 'Concluído',
      [AppointmentStatus.CANCELLED]: 'Cancelado',
      [AppointmentStatus.NO_SHOW]: 'Não Comparecido'
    };
    return statusMap[this.status];
  }

  /**
   * Domain Logic: Get full datetime
   */
  getDateTime(): Date {
    return new Date(`${this.date}T${this.time}`);
  }

  /**
   * Domain Logic: Check if appointment is valid
   */
  isValid(): boolean {
    return (
      this.petId.trim().length > 0 &&
      this.tutorId.trim().length > 0 &&
      this.service.trim().length > 0 &&
      this.duration > 0 &&
      !this.isPast()
    );
  }
}
