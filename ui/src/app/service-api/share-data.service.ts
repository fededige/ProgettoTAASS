import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

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

    searchDataObservable(searchData: string[]) {
        this.searchData.next(searchData);
    }
    bookDetailsObservable(bookDetails: string) {
      this.bookDetails.next(bookDetails);
    }

    userLoggedObservable(userLogged: boolean) {
        this.isLogged.next(userLogged);
    }
}
