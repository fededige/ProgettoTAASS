import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {user} from "../model/user";
@Injectable({
  providedIn: 'root'
})
export class BookApiService {

    constructor(private http: HttpClient) { }
    private urlCatalog = 'http://localhost:8080/catalog';

    insertBook(idToken: string, titolo: string, autore: string, annoPubblicazione: string, genere: string,
               durataPrestito: string, condizioni: string, casaEditrice: string, plot: string, cover: any, loggedUser: user){
        let book = {
            title : titolo,
            author : autore,
            publishingDate : annoPubblicazione,
            genre : genere,
            plot : plot,
            owner: {
              username: loggedUser.username,
              email: loggedUser.email,
            },
            condition: condizioni,
            publisher: casaEditrice,
            loanDuration: durataPrestito,
            cover: cover,
            timesRead: 0,
            timesReadThisMonth: 0,
            available: true
        }
        console.log(book);
        let bookJSON = JSON.stringify(book);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + idToken
        });
        console.log(bookJSON);
        return this.http.post(this.urlCatalog + '/insert', bookJSON, { headers: headers, observe: 'response' });  // observe: 'response' serve per far ritornare in data lo status della risposta
    }

    isbnAPI(isbn: string){
        return this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
    }

    getBook(book: any) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.urlCatalog + "/getBook", book, { headers: headers });
    }
}

