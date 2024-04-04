import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizContainerComponent } from './components/quiz-container/quiz-container.component';

const routes: Routes = [
  {
    path: '',
    component: QuizContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
