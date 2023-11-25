import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputBookComponent } from './input-book/input-book.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AnnunciComponent } from './annunci/annunci.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent},
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'inserisci-libro', component: InputBookComponent },
  { path: 'annunci', component:  AnnunciComponent},
  { path: 'login', component:  LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
