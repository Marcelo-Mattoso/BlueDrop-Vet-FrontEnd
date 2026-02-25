/**
 * API Configuration
 * Layer: Infrastructure
 * Centralized API configuration
 */

export const API_CONFIG = {
  baseUrl: '',
  endpoints: {
    pets: '/api/pets',
    tutors: '/api/tutors',
    appointments: '/api/appointments',
    dashboard: '/api/dashboard',
    auth: '/api/auth'
  },
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000
};
