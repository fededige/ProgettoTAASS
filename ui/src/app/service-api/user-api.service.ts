import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    private urlUser = 'http://localhost:8080/user';
    constructor(private http: HttpClient) { }

    login(idToken: string, username: string, email: string) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + idToken
        });
        let user = {
            username: username,
            email: email,
            coins: 0
        };
        return this.http.post(this.urlUser + '/insert', user, {headers: headers});
    }
}
