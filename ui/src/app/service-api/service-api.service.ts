import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  constructor(private http: HttpClient) { }
  private urlCatalog = 'https://localhost:8080/catalog';
  private urlUser ='https://localhost:8080/user';

  insertBook(){
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const params = new HttpParams({
      fromObject: { title : 'name',
        author : 'email',
        publishingDate : 'role',
        genre : 'Inactive',
        plot : 1234567890,
        // owner: ,
        // condition: ,
        // publisher: ,
        // loanDuration: ,
        // timesRead: ,
        // timesReadThisMonth: ,
        // available: ,
      }
    });
    return this.http.post(this.urlCatalog + '/insert', params, {headers});
  }
}

