import { Injectable, NgZone } from '@angular/core';
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
      sessionStorage.setItem(AuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
      this.isSignedInChanged.next(true);
      this.router.navigate(['/dashboard']);
    });
  }

  public isSignedInChanged$(): Observable<boolean> {
    return this.isSignedInChanged.asObservable();
  }

  public signOut(): void {
    this.googleAuth.getAuth().subscribe((auth) => {
      auth.signOut();
      sessionStorage.removeItem(AuthService.SESSION_STORAGE_KEY);
      this.isSignedInChanged.next(false);
      this.router.navigate(['/']);
    });
  }
}
