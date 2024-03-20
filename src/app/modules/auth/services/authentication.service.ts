import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Observable, from, throwError } from 'rxjs';
import { LoginData, SignupData } from '../models/auth-data.type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isUserLoggedIn$ = authState(this.authenticationFirebase);

  constructor(private authenticationFirebase: Auth) {}

  signup({ email, password }: SignupData): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.authenticationFirebase, email, password));
  }

  login({ email, password }: LoginData): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.authenticationFirebase, email, password));
  }

  logout() {
    return from(signOut(this.authenticationFirebase));
    // return throwError(() => Error('dupa'));
  }
}
