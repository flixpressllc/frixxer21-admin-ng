import { Injectable, NgZone, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static SESSION_STORAGE_KEY = 'accessToken';
  private user: GoogleUser = undefined;
  private isSignedInChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private maintainAccessTokenTimeout: number;

  constructor(private googleAuth: GoogleAuthService,
              private router: Router,
              private ngZone: NgZone) {
    this.isSignedInChanged.next(this.getToken() !== null);
  }

  public getToken(): string {
    const token: string = sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY);
    if (!token) {
        return null;
    }
    return token;
  }

  public getCurrentUser(): GoogleUser {
    return this.user;
  }

  public signIn(): void {
    this.googleAuth.getAuth().subscribe((auth) => {
      auth.signIn().then(res => this.signInSuccessHandler(res));
    });
  }

  private signInSuccessHandler(res: GoogleUser): void {
    this.ngZone.run(() => {
      this.user = res;
      sessionStorage.setItem(AuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
      this.isSignedInChanged.next(true);
      this.maintainAccessToken();
      this.router.navigate(['/dashboard']);
    });
  }

  public isSignedInChanged$(): Observable<boolean> {
    return this.isSignedInChanged.asObservable();
  }

  public maintainAccessToken(): void {
    this.maintainAccessTokenTimeout = setTimeout(() => {

      this.user.reloadAuthResponse().then((authResponse: gapi.auth2.AuthResponse) => {
        sessionStorage.setItem(AuthService.SESSION_STORAGE_KEY, authResponse.access_token);
      });

      this.maintainAccessToken();
    }, 30 * 60 * 1000);
  }

  public signOut(): void {
    this.googleAuth.getAuth().subscribe((auth) => {
      auth.signOut();
      sessionStorage.removeItem(AuthService.SESSION_STORAGE_KEY);
      this.isSignedInChanged.next(false);
      if (this.maintainAccessTokenTimeout != null) {
        clearTimeout(this.maintainAccessTokenTimeout);
      }
      this.router.navigate(['/']);
    });
  }
}
