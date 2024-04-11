import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './pages/auth/auth.component';
import { SignupFormComponent } from './components/signup/signup-form.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginFormComponent, SignupFormComponent, AuthComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
