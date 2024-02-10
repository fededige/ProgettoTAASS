import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import {user} from "../model/user";

@Injectable({
    providedIn: 'root'
})
export class ShareDataService {
    private searchData = new BehaviorSubject([""]);
    searchData$ = this.searchData.asObservable();

    private bookDetails = new BehaviorSubject("");
    bookDetails$ = this.bookDetails.asObservable();

    private isLogged = new BehaviorSubject(false);
    isLogged$ = this.isLogged.asObservable();

    private loggedUser = new BehaviorSubject(new user());
    loggedUser$ = this.loggedUser.asObservable();

    searchDataObservable(searchData: string[]) {
        this.searchData.next(searchData);
    }
    bookDetailsObservable(bookDetails: string) {
      this.bookDetails.next(bookDetails);
    }
    isLoggedObservable(isLogged: boolean) {
        this.isLogged.next(isLogged);
    }
    loggedUserObservable(userLogged: user) {
        this.loggedUser.next(userLogged);
    }
}
