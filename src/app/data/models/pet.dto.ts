/**
 * Pet DTOs (Data Transfer Objects)
 * Layer: Data/Presentation
 * These are used for data transfer between API and application
 */

export interface PetDTO {
  id: string;
  name: string;
  breed: string;
  species: string;
  age: number;
  weight?: number;
  avatar?: string;
  tutorId: string;
  isActive: boolean;
}

export interface CreatePetDTO {
  name: string;
  breed: string;
  species: string;
  age: number;
  weight?: number;
  tutorId: string;
}

export interface UpdatePetDTO {
  name?: string;
  breed?: string;
  species?: string;
  age?: number;
  weight?: number;
  isActive?: boolean;
}
