import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class LoginModule { }
