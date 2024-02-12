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
import { ShareDataService } from "./service-api/share-data.service";
import { canActivateTeam } from "./service-api/permission.service";
import {UnauthorizedPageComponent} from "./unauthorized-page/unauthorized-page.component";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LandingPageComponent},
    { path: 'catalogo', component: CatalogoComponent},
    { path: 'catalogo/:title', component: BookDetailsComponent},
    { path: 'inserisci-libro', component: InputBookComponent, canActivate: [canActivateTeam]},
    { path: 'annunci', component:  AnnunciComponent},
    { path: 'login', component:  LoginComponent },
    { path: 'success', component: SuccessPageComponent, canActivate: [canActivateTeam]},
    { path: 'unauthorized', component: UnauthorizedPageComponent},
    { path: 'profilo', component: ProfileComponent, canActivate: [canActivateTeam]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    isLoggedIn?: boolean
    constructor(private shareDataService: ShareDataService) {
    }
    // ngOnInit() {
    //     this.shareDataService.isLogged$.subscribe((data: boolean) => {
    //         this.isLoggedIn = data;
    //     });
    // }
}
