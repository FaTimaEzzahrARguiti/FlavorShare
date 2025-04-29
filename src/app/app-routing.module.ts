import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecetteListComponent } from './components/recette-list/recette-list.component';
import { RecetteDetailsComponent } from './components/recette-details/recette-details.component';

const routes: Routes = [
  { path: '', component: RecetteListComponent },
  { path: 'details/:id', component: RecetteDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
