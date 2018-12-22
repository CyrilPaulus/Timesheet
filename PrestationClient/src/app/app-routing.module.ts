import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeChantierComponent } from './code-chantier/code-chantier.component';
import { PrestationComponent } from './prestation/prestation.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'prestations', component: PrestationComponent },
  { path: 'prestations/:user', component: PrestationComponent },
  { path: 'prestations/:user/:year', component: PrestationComponent },
  { path: 'prestations/:user/:year/:month', component: PrestationComponent },
  { path: 'codes-chantier', component: CodeChantierComponent },
  { path: 'users', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
