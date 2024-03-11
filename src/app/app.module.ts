import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/components/header/header.component';
import { DashboardComponent } from './modules/gameboard/dashboard.component';
import { AuthenticationInterceptor } from './core/interceptors/auth.interceptor';
import { GamesComponent } from './modules/gameboard/pages/game/games.component';
import { AnswerTileComponent } from './modules/gameboard/components/answer-tile/answer-tile.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		DashboardComponent,
    GamesComponent,
    AnswerTileComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		LoginModule,
    SharedModule
	],
	providers: [
		HttpClientModule,
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
