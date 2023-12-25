import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiKeyInterceptor } from './core/interceptors/api-key.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule
  ],
  providers: [
    HttpClientModule,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
