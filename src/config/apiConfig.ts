/**
 * FaithPass Global REST API Environment Configuration
 * Automatically switches between Local Development server and Live Production API Endpoint.
 */

export class API_CONFIG {
  static get BASE_URL(): string {
    return (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5001';
  }
}
