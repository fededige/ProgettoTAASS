import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputBookComponent } from './input-book/input-book.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AnnunciComponent } from './annunci/annunci.component';
import { LoginComponent } from './login/login.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SuccessPageComponent } from "./success-page/success-page.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileBooksComponent } from "./profile-books/profile-books.component";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LandingPageComponent},
    { path: 'catalogo', component: CatalogoComponent },
    { path: 'catalogo/:title', component: BookDetailsComponent},
    { path: 'inserisci-libro', component: InputBookComponent },
    { path: 'annunci', component:  AnnunciComponent},
    { path: 'login', component:  LoginComponent },
    { path: 'success', component: SuccessPageComponent },
    { path: 'profilo', component: ProfileComponent, children: [
        { path: 'libri', component: ProfileBooksComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
