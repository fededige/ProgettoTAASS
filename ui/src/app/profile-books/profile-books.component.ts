import {Component, Input, OnInit} from '@angular/core';
import {reservation} from "../model/reservation";
import {BookApiService} from "../service-api/book-api.service";

@Component({
  selector: 'app-profile-books',
  templateUrl: './profile-books.component.html',
  styleUrl: './profile-books.component.css'
})
export class ProfileBooksComponent implements OnInit {
    @Input() reservation?: reservation;
    book?: any;


    constructor(private apiService: BookApiService) { }
    ngOnInit() {
        this.apiService.getBook(this.reservation?.book).subscribe((data) => {
            this.book = data;
            this.book.cover = this.book.cover.replace("http://", "https://");
            console.log(this.book);
        });
    }
}
