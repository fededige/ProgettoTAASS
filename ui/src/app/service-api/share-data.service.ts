import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import {book} from "../model/book";

@Injectable({
    providedIn: 'root'
})
export class ShareDataService {
    private searchData = new BehaviorSubject([""]);
    searchData$ = this.searchData.asObservable();

    private bookDetails = new BehaviorSubject("");
    bookDetails$ = this.bookDetails.asObservable();

    searchDataObservable(searchData: string[]) {
        this.searchData.next(searchData);
    }
    changeBookDetails(bookDetails: string) {
      this.bookDetails.next(bookDetails);
    }

}
