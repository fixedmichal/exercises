import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizContainerComponent } from './components/quiz-container/quiz-container.component';
import { QuizResultsComponent } from './components/quiz-results/quiz-results.component';

const routes: Routes = [
  {
    path: '',
    component: QuizContainerComponent,
  },
  {
    path: 'results',
    component: QuizResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
