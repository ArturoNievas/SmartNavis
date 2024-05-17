import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private handleError(
    error: HttpErrorResponse,
    method: string,
    endpoint: string,
    payload?: any,
  ): Observable<never> {
    console.error(`Error on API call '${method} ..${endpoint}'.`);
    if (payload) {
      console.error(`Payload:`, payload);
    }
    if (error.status === 0) {
      console.error('Client error:', error.error);
    } else {
      console.error(`Backend error ${error.status}; body:`, error.error);
    }
    if (error.status === 400 || error.status === 404 || error.status === 500) {
      return throwError(() => new Error(error.error));
    }

    console.error('Error:', error);
    return throwError(
      () =>
        new Error(
          'Ocurrió un error inesperado; por favor intenta nuevamente en unos instantes.',
        ),
    );
  }

  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + endpoint).pipe(
      retry(environment.apiRetryAttempts),
      catchError((error) => this.handleError(error, 'GET', endpoint)),
    );
  }

  public post<T>(endpoint: string, payload: T): Observable<T> {
    return this.http.post<T>(this.baseUrl + endpoint, payload, {}).pipe(
      retry(environment.apiRetryAttempts),
      catchError((error) => this.handleError(error, 'POST', endpoint, payload)),
    );
  }

  public put<T>(endpoint: string, payload: T): Observable<T> {
    return this.http
      .put<T>(this.baseUrl + endpoint, payload, {})
      .pipe(
        catchError((error) =>
          this.handleError(error, 'PUT', endpoint, payload),
        ),
      );
  }

  public delete(endpoint: string): Observable<unknown> {
    return this.http
      .delete(this.baseUrl + endpoint, {})
      .pipe(catchError((error) => this.handleError(error, 'DELETE', endpoint)));
  }
}
