import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  constructor(private http: HttpClient) { }
  private urlCatalog = 'http://localhost:8080/catalog';
  private urlUser ='https://localhost:8080/user';

  insertBook(titolo: string, autore: string, annoPubblicazione: string, genere: string,
             durataPrestito: string, condizioni: string, casaEditrice: string, plot: string, cover: any){
    let book = {
      title : titolo,
      author : autore,
      publishingDate : annoPubblicazione,
      genre : genere,
      plot : plot,
      owner: {
        username: 'prova',
        email: 'prova@example.com'
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
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    console.log(bookJSON);
    return this.http.post(this.urlCatalog + '/insert', bookJSON, { headers: headers, observe: 'response' });  // observe: 'response' serve per far ritornare in data lo status della risposta
  }


  isbnAPI(isbn: string){
      return this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
  }

  getUsers(){
    return this.http.get('http://localhost:8080/user/');
  }
}

