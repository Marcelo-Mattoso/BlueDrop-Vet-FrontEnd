/**
 * Tutor DTOs (Data Transfer Objects)
 * Layer: Data/Presentation
 * These are used for data transfer between API and application
 */

export interface TutorDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  location?: string;
  isResponsible?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTutorDTO {
  name: string;
  email: string;
  phone: string;
  document: string;
  location?: string;
}

export interface UpdateTutorDTO {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  isActive?: boolean;
}
