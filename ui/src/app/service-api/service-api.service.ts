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
    let dateFields = annoPubblicazione.split('/');
    annoPubblicazione = dateFields[2] + "-" + dateFields[0] +  "-" + dateFields[1];
    let book = {
      title : titolo,
      author : autore,
      publishingDate : annoPubblicazione,
      genre : genere,
      plot : plot,
      owner: {
        username: 'test23',
        email: 'test23@example.com'
      },
      condition: condizioni,
      publisher: casaEditrice,
      loanDuration: durataPrestito,
      cover: cover,
      timesRead: 0,
      timesReadThisMonth: 0,
      available: true
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'POST,GET,PUT,DELETE'});
    console.log(JSON.stringify(book));
    return this.http.post(this.urlCatalog + '/insert', book, {headers});
  }


  isbnAPI(isbn: string){
      return this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
  }
}
