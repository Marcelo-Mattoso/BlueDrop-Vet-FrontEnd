/**
 * Pet Entity
 * Layer: Domain
 * Core domain logic for Pet aggregate
 */

import type { PetDTO } from '../../data/models';

export class Pet {
  id: string;
  name: string;
  breed: string;
  species: string;
  age: number;
  weight?: number;
  avatar?: string;
  tutorId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PetDTO & { createdAt?: Date; updatedAt?: Date }) {
    this.id = data.id;
    this.name = data.name;
    this.breed = data.breed;
    this.species = data.species;
    this.age = data.age;
    this.weight = data.weight;
    this.avatar = data.avatar;
    this.tutorId = data.tutorId;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Domain Logic: Calculate pet age category
   */
  getAgeCategory(): 'filhote' | 'adulto' | 'sênior' {
    if (this.age < 2) return 'filhote';
    if (this.age < 7) return 'adulto';
    return 'sênior';
  }

  /**
   * Domain Logic: Check if pet needs vaccination
   */
  needsVaccination(): boolean {
    // Business rule: pets need vaccination every year
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    return this.updatedAt < lastYear;
  }

  /**
   * Domain Logic: Get display name with species
   */
  getDisplayName(): string {
    return `${this.name} (${this.species})`;
  }

  /**
   * Domain Logic: Validate pet data
   */
  isValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.breed.trim().length > 0 &&
      this.species.trim().length > 0 &&
      this.age >= 0 &&
      (!this.weight || this.weight > 0)
    );
  }

  /**
   * Domain Logic: Deactivate pet
   */
  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  /**
   * Domain Logic: Activate pet
   */
  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }
}
