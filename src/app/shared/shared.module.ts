import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationClientService } from './services/clients/authentication-client.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'; 
@NgModule({
	providers: [
		AuthenticationClientService
	],
	declarations: [
	],
	imports: [
    MatButtonModule,
		CommonModule,
		HttpClientModule
	],
  exports: [
    MatButtonModule
  ]
})
export class SharedModule { }
