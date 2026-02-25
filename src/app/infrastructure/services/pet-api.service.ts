/**
 * Pet API Service
 * Layer: Infrastructure/Data Access
 * Handles HTTP communication for Pet aggregate
 * 
 * NOTE: HttpClient implementation pending - using mock data for now
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import type { PetDTO, CreatePetDTO, UpdatePetDTO } from '../../data/models';
import { Pet } from '../../domain/entities';

@Injectable({
  providedIn: 'root'
})
export class PetApiService {
  /**
   * Get all pets (mock implementation)
   */
  getAllPets(): Observable<Pet[]> {
    // TODO: Replace with actual HTTP call once HttpClient is properly resolved
    return of([]).pipe(delay(300));
  }

  /**
   * Get pet by ID (mock implementation)
   */
  getPetById(id: string): Observable<Pet> {
    return of(null as any).pipe(delay(300));
  }

  /**
   * Get pets by tutor (mock implementation)
   */
  getPetsByTutor(tutorId: string): Observable<Pet[]> {
    return of([]).pipe(delay(300));
  }

  /**
   * Create new pet (mock implementation)
   */
  createPet(data: CreatePetDTO): Observable<Pet> {
    return of(null as any).pipe(delay(300));
  }

  /**
   * Update pet (mock implementation)
   */
  updatePet(id: string, data: UpdatePetDTO): Observable<Pet> {
    return of(null as any).pipe(delay(300));
  }

  /**
   * Delete pet (mock implementation)
   */
  deletePet(id: string): Observable<void> {
    return of(void 0).pipe(delay(300));
  }
}
