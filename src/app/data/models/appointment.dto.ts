/**
 * Appointment DTOs (Data Transfer Objects)
 * Layer: Data/Presentation
 * These are used for data transfer between API and application
 */

export interface AppointmentDTO {
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
}

export interface CreateAppointmentDTO {
  petId: string;
  tutorId: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
}

export interface UpdateAppointmentDTO {
  service?: string;
  date?: string;
  time?: string;
  duration?: number;
  status?: AppointmentStatus;
  notes?: string;
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}
