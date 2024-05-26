import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {environment} from "../../../environments/environment";
import {catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {AuthResult} from "../../interfaces/auth-result";
import {Me} from "../../interfaces/me";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static readonly jwtTokenGetter: () => string | null = () => {
    return localStorage.getItem(environment.jwtTokenStorageKey);
  };

  private readonly authUrl: string = "/auth";

  private userData: Me | null;

  constructor(private apiService: ApiService) {
    this.userData = null;
  }

  private deleteToken(): void {
    localStorage.removeItem(environment.jwtTokenStorageKey);
  }

  private storeToken(token: string): void {
    localStorage.setItem(environment.jwtTokenStorageKey, token);
  }

  public isUserAuthenticated(): boolean {
    return (AuthService.jwtTokenGetter() !== null);
  }

  public getMe(): Me {
    if (!this.isUserAuthenticated()) {
      throw new Error("Usuario no autenticado.");
    }
    return this.userData!;
  }

  public userIsAdmin(): boolean {
    return (this.getMe().role === 'ADMINISTRADOR');
  }

  public me(): Observable<Me> {
    if (!this.isUserAuthenticated()) {
      throw new Error("Usuario no autenticado.");
    }
    this.userData = null;
    return this.apiService.get<Me>(`${this.authUrl}/me`).pipe(
      tap((me: Me) => {
        this.userData = me;
      })
    );
  }

  public doLogin(username: string, password: string): Observable<Me> {
    this.deleteToken();
    return this.apiService.post<AuthResult>(`${this.authUrl}/login`, {username, password}).pipe(
      tap((authResult: AuthResult) => {
        this.storeToken(authResult.token);
      }),
      switchMap(() => {
        return this.me();
      })
    );
  }

  public doLogout(): Observable<boolean> {
    this.deleteToken();
    return this.apiService.post<void>(`${this.authUrl}/logout`).pipe(
      map(() => true),
      catchError(() => of(true)) // Logout should never fail.
    );
  }
}
