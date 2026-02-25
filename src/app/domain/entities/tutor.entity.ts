/**
 * Tutor Entity
 * Layer: Domain
 * Core domain logic for Tutor aggregate
 */

import type { TutorDTO } from '../../data/models';

export class Tutor {
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

  constructor(data: TutorDTO) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.document = data.document;
    this.location = data.location;
    this.isResponsible = data.isResponsible;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Domain Logic: Validate email format
   */
  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  /**
   * Domain Logic: Validate phone format
   */
  isValidPhone(): boolean {
    // Remove non-digit characters
    const phoneDigits = this.phone.replace(/\D/g, '');
    return phoneDigits.length >= 10 && phoneDigits.length <= 11;
  }

  /**
   * Domain Logic: Validate document (CPF/CNPJ)
   */
  isValidDocument(): boolean {
    const documentDigits = this.document.replace(/\D/g, '');
    return documentDigits.length === 11 || documentDigits.length === 14;
  }

  /**
   * Domain Logic: Validate tutor data
   */
  isValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.isValidEmail() &&
      this.isValidPhone() &&
      this.isValidDocument()
    );
  }

  /**
   * Domain Logic: Get display name
   */
  getDisplayName(): string {
    return this.name;
  }

  /**
   * Domain Logic: Deactivate tutor
   */
  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  /**
   * Domain Logic: Activate tutor
   */
  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  /**
   * Domain Logic: Get contact info
   */
  getContactInfo(): string {
    return `${this.phone} | ${this.email}`;
  }
}
