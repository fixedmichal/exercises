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
import { Observable, filter, from, shareReplay, tap, throwError } from 'rxjs';
import { LoginData, SignupData } from '../models/auth-data.type';
import { StorageHelper } from 'src/app/shared/services/storage/storage-helper.util';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isUserLoggedIn$ = authState(this.authenticationFirebase).pipe(
    filter((user) => Boolean(user)),
    tap((user) => console.log('getUser: ', user?.uid)),
    tap((user) => StorageHelper.setItem('userId', user?.uid)),
    shareReplay(1)
  );

  constructor(private authenticationFirebase: Auth) {}

  signup({ email, password }: SignupData): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.authenticationFirebase, email, password));
  }

  login({ email, password }: LoginData): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.authenticationFirebase, email, password)).pipe(
      tap((userCredential) => StorageHelper.setItem('userId', userCredential.user.uid))
    );
  }

  logout() {
    return from(signOut(this.authenticationFirebase));
  }
}
