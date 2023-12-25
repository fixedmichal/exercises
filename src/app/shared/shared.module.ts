import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationClientService } from './services/clients/authentication-client.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [
    AuthenticationClientService
  ],
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
