import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/components/header/header.component';
import { DashboardComponent } from './modules/gameboard/components/dashboard/dashboard.component';
import { AnswerTileComponent } from './modules/gameboard/components/answer-tile/answer-tile.component';
import { SharedModule } from './shared/shared.module';
import { QuizContainerComponent } from './modules/gameboard/components/quiz-container/quiz-container.component';
import { QuestionContentDirective } from './shared/directives/game-content.directive';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FourTilesQuestionComponent } from './modules/gameboard/components/four-tiles-one-answer-game/four-tiles-question.component';
import { WriteRomajiQuestionComponent } from './modules/gameboard/components/write-romaji-game/write-romaji-question.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    AnswerTileComponent,
    QuizContainerComponent,
    QuestionContentDirective,
    WriteRomajiQuestionComponent,
    FourTilesQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    A11yModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
