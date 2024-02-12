import {Component, Input, OnInit} from '@angular/core';
import {reservation} from "../model/reservation";
import {BookApiService} from "../service-api/book-api.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-profile-books',
    templateUrl: './profile-books.component.html',
    styleUrl: './profile-books.component.css'
})
export class ProfileBooksComponent implements OnInit {
    @Input() reservation?: reservation;
    @Input() owner?: boolean;
    book?: any;


    constructor(private apiService: BookApiService, private sanitizer: DomSanitizer) { }
    ngOnInit() {
        this.apiService.getBook(this.reservation?.book).subscribe((data: any) => {
            console.log(data);
            this.book = data;
            if(this.book.cover == null || this.book.cover == ""){
                this.book.cover = "../../assets/book-default.jpg";
            }
        });
    }

    sanitizeImgUrl(imageUrl: string) {
        return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
}
