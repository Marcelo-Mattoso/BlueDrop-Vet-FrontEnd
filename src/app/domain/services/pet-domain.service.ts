/**
 * Pet Domain Service
 * Layer: Domain/Business Logic
 * Orchestrates pet-related business logic
 */

import { Injectable } from '@angular/core';
import type { Pet } from '../entities/pet.entity';

@Injectable({
  providedIn: 'root'
})
export class PetDomainService {
  /**
   * Filter pets by tutors
   */
  filterPetsByTutor(pets: Pet[], tutorId: string): Pet[] {
    return pets.filter(pet => pet.tutorId === tutorId);
  }

  /**
   * Filter active pets only
   */
  filterActivePets(pets: Pet[]): Pet[] {
    return pets.filter(pet => pet.isActive);
  }

  /**
   * Filter pets by species
   */
  filterPetsBySpecies(pets: Pet[], species: string): Pet[] {
    return pets.filter(pet => pet.species.toLowerCase() === species.toLowerCase());
  }

  /**
   * Group pets by tutors
   */
  groupPetsByTutor(pets: Pet[]): Record<string, Pet[]> {
    return pets.reduce(
      (acc, pet) => {
        if (!acc[pet.tutorId]) {
          acc[pet.tutorId] = [];
        }
        acc[pet.tutorId].push(pet);
        return acc;
      },
      {} as Record<string, Pet[]>
    );
  }

  /**
   * Calculate age range distribution
   */
  getAgeDistribution(pets: Pet[]): Record<string, number> {
    return pets.reduce(
      (acc, pet) => {
        const category = pet.getAgeCategory();
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }

  /**
   * Find pets needing vaccination
   */
  getPetsNeedingVaccination(pets: Pet[]): Pet[] {
    return pets.filter(pet => pet.needsVaccination());
  }

  /**
   * Sort pets by name
   */
  sortByName(pets: Pet[], ascending: boolean = true): Pet[] {
    return [...pets].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return ascending ? comparison : -comparison;
    });
  }
}
