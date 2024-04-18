import { Injectable } from '@angular/core';

import {
  Auth,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable, filter, from, shareReplay, tap, throwError } from 'rxjs';
import { LoginData, SignupData } from '../models/auth-data.type';
import { StorageHelper } from 'src/app/shared/services/storage/storage-helper.util';
import { CleanupService } from 'src/app/shared/services/cleanup.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isUserLoggedIn$ = authState(this.authenticationFirebase).pipe(
    tap((user) => StorageHelper.setItem('userId', user?.uid)),
    shareReplay(1)
  );

  constructor(private authenticationFirebase: Auth, private cleanupService: CleanupService) {}

  signup({ email, password }: SignupData): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.authenticationFirebase, email, password));
  }

  login({ email, password }: LoginData): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.authenticationFirebase, email, password)).pipe(
      tap((userCredential) => StorageHelper.setItem('userId', userCredential.user.uid)),
      tap(() => this.cleanupService.cleanup())
    );
  }

  logout() {
    return from(signOut(this.authenticationFirebase));
  }
}
