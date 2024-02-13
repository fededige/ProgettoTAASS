import {Component, Input, OnInit} from '@angular/core';
import {reservation} from "../model/reservation";
import {BookApiService} from "../service-api/book-api.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ReservationApiService} from "../service-api/reservation-api.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
    selector: 'app-profile-books',
    templateUrl: './profile-books.component.html',
    styleUrl: './profile-books.component.css'
})
export class ProfileBooksComponent implements OnInit {
    @Input() reservation?: reservation;
    @Input() owner?: boolean;
    book?: any;
    returnMessage: number = 0;


    constructor(private apiBookService: BookApiService, private sanitizer: DomSanitizer,
                private apiReservationService: ReservationApiService, private router: Router) { }


    ngOnInit() {
        console.log("OnInit");
        console.log(this.owner);
        console.log(this.book);
        this.apiBookService.getBook(this.reservation?.book).subscribe((data: any) => {
            console.log(data);
            this.book = data;
            if(this.reservation != null && this.reservation.date != null){
                let reservationDate = new Date(this.reservation.date);
                let maxDate: Date = new Date();
                maxDate.setDate(reservationDate.getDate() + this.transalateDuration(this.book.loanDuration));
                let middleDate: Date = new Date();
                middleDate.setDate(reservationDate.getDate() + this.transalateDuration(this.book.loanDuration) / 2);
                if(maxDate < new Date()){
                    this.returnMessage = 1
                } else if (middleDate < new Date()){
                    this.returnMessage = 2
                }
            }
            if(this.book.cover == null || this.book.cover == ""){
                this.book.cover = "../../assets/book-default.jpg";
            }
        });
    }

    sanitizeImgUrl(imageUrl: string) {
        return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }

    restituisci(reservationId?: number){
        if(reservationId != null) {
            let idToken = sessionStorage.getItem("idToken");
            if(idToken != null) {
                this.apiReservationService.makeBookAvailable(idToken, reservationId).subscribe({
                    next: (data) => {
                        console.log("make book available success");
                        // let tempSelectedItem = this.selectedItem;
                        // window.location.reload();
                        // if(tempSelectedItem != null) {
                        //     console.log(tempSelectedItem);
                        //     this.shareDataService.selectedItemObservable(tempSelectedItem);
                        // }
                        const navigationExtras: NavigationExtras = {
                            state: {
                                title: 'LIBRO RESTITUITO CON SUCCESSO!',
                                subtitle: '',
                                navigateTo: 'profilo'
                            }
                        }
                        this.router.navigate(['/success'], navigationExtras);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            }
        }
    }

    transalateDuration(loanDuration: string) {
        let res:number;
        switch (loanDuration) {
            case "QUINDICI": res = 15;
                break;
            case "TRENTA": res = 30;
                break;
            case "QUARANTACINQUE": res = 45;
                break;
            case "SESSANTA": res = 60;
                break;
            default: res = 0;
        }
        console.log(loanDuration + " " + res);
        return res;
    }
}
