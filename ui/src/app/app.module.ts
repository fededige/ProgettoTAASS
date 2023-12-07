import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { AnnunciComponent } from './annunci/annunci.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CatalogoSearchComponent } from './catalogo-search/catalogo-search.component';
import { CatalogoDefaultComponent } from './catalogo-default/catalogo-default.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
