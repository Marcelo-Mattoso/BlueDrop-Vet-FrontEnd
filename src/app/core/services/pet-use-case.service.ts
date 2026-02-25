/**
 * Pet Use Case Service
 * Layer: Application/MVC Controller
 * Orchestrates domain services and infrastructure for pet use cases
 */

import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { PetDomainService } from '../../domain/services';
import { PetApiService } from '../../infrastructure/services/pet-api.service';
import { Pet } from '../../domain/entities';
import type { CreatePetDTO, UpdatePetDTO } from '../../data/models';

export interface PetState {
  pets: Pet[];
  selectedPet: Pet | null;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PetUseCaseService {
  private state = signal<PetState>({
    pets: [],
    selectedPet: null,
    loading: false,
    error: null
  });

  // Computed signals
  pets = computed(() => this.state().pets);
  selectedPet = computed(() => this.state().selectedPet);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);
  activePets = computed(() => this.state().pets.filter(p => p.isActive));

  constructor(
    private domainService: PetDomainService,
    private apiService: PetApiService
  ) {}

  /**
   * Use Case: Load all pets
   */
  loadPets(): Observable<Pet[]> {
    this.state.update(s => ({ ...s, loading: true }));
    return this.apiService.getAllPets().pipe(
      tap(pets => {
        const sortedPets = this.domainService.sortByName(pets);
        this.state.update(s => ({
          ...s,
          pets: sortedPets,
          loading: false
        }));
      }),
      catchError(error => {
        this.state.update(s => ({
          ...s,
          loading: false,
          error: 'Erro ao carregar pets'
        }));
        throw error;
      })
    );
  }

  /**
   * Use Case: Get pets by tutor
   */
  getPetsByTutor(tutorId: string): Observable<Pet[]> {
    return this.apiService.getPetsByTutor(tutorId).pipe(
      tap(pets => {
        const sortedPets = this.domainService.sortByName(pets);
        this.state.update(s => ({
          ...s,
          pets: sortedPets
        }));
      })
    );
  }

  /**
   * Use Case: Create pet
   */
  createPet(data: CreatePetDTO): Observable<Pet> {
    this.state.update(s => ({ ...s, loading: true }));
    return this.apiService.createPet(data).pipe(
      tap(newPet => {
        this.state.update(s => ({
          ...s,
          pets: [...s.pets, newPet],
          loading: false
        }));
      }),
      catchError(error => {
        this.state.update(s => ({
          ...s,
          loading: false,
          error: 'Erro ao criar pet'
        }));
        throw error;
      })
    );
  }

  /**
   * Use Case: Update pet
   */
  updatePet(id: string, data: UpdatePetDTO): Observable<Pet> {
    this.state.update(s => ({ ...s, loading: true }));
    return this.apiService.updatePet(id, data).pipe(
      tap(updatedPet => {
        this.state.update(s => ({
          ...s,
          pets: s.pets.map(p => p.id === id ? updatedPet : p),
          selectedPet: s.selectedPet?.id === id ? updatedPet : s.selectedPet,
          loading: false
        }));
      }),
      catchError(error => {
        this.state.update(s => ({
          ...s,
          loading: false,
          error: 'Erro ao atualizar pet'
        }));
        throw error;
      })
    );
  }

  /**
   * Use Case: Delete pet
   */
  deletePet(id: string): Observable<void> {
    this.state.update(s => ({ ...s, loading: true }));
    return this.apiService.deletePet(id).pipe(
      tap(() => {
        this.state.update(s => ({
          ...s,
          pets: s.pets.filter(p => p.id !== id),
          selectedPet: s.selectedPet?.id === id ? null : s.selectedPet,
          loading: false
        }));
      }),
      catchError(error => {
        this.state.update(s => ({
          ...s,
          loading: false,
          error: 'Erro ao deletar pet'
        }));
        throw error;
      })
    );
  }

  /**
   * Use Case: Select pet
   */
  selectPet(pet: Pet): void {
    this.state.update(s => ({ ...s, selectedPet: pet }));
  }

  /**
   * Use Case: Clear selection
   */
  clearSelection(): void {
    this.state.update(s => ({ ...s, selectedPet: null }));
  }

  /**
   * Use Case: Get pets needing vaccination
   */
  getPetsNeedingVaccination(): Pet[] {
    return this.domainService.getPetsNeedingVaccination(this.state().pets);
  }
}
