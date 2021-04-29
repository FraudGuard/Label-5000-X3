import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LabelComponent } from './label/label.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'label',
    pathMatch: 'full'
  },
  {
    path: 'label',
    component: LabelComponent
  },
  {
    path: 'review',
    component: ReviewComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
