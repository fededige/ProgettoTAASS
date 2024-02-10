import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { HttpClientModule } from  '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import {
    SocialLoginModule,
    SocialAuthServiceConfig,
    GoogleLoginProvider,
    GoogleSigninButtonModule,
} from "@abacritt/angularx-social-login";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { BookCardComponent } from './book-card/book-card.component';
import { InputBookComponent } from './input-book/input-book.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AnnunciComponent } from './annunci/annunci.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CatalogoSearchComponent } from './catalogo-search/catalogo-search.component';
import { CatalogoDefaultComponent } from './catalogo-default/catalogo-default.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from "@angular/forms";
import { SuccessPageComponent } from './success-page/success-page.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileBooksComponent } from './profile-books/profile-books.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SearchbarComponent,
        BookCardComponent,
        InputBookComponent,
        LandingPageComponent,
        CatalogoComponent,
        AnnunciComponent,
        LoginComponent,
        FooterComponent,
        BookDetailsComponent,
        CatalogoSearchComponent,
        CatalogoDefaultComponent,
        SuccessPageComponent,
        ProfileComponent,
        ProfileBooksComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        NgbModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        ReactiveFormsModule,
        SocialLoginModule,
        GoogleSigninButtonModule,
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('257481680616-c0178tdoda5c1e6ihcrvqpuoqk7gq5sd.apps.googleusercontent.com'),
                    },
                ],
            } as SocialAuthServiceConfig,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
