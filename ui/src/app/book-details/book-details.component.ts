import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {ShareDataService} from "../service-api/share-data.service";
import {user} from "../model/user";
import {ReservationApiService} from "../service-api/reservation-api.service";

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
    title: any
    bookClicked?: any = {
        "title": "",
        "author": "",
        "publishedDate": "",
        "genre": "",
        "loanDuration": "",
        "condition": "",
        "publisher": "",
        "plot": "",
        "cover": ""
    };
    isLoggedin?: boolean;
    loggedUser?: user;
    constructor(private shareDataService: ShareDataService, private route: ActivatedRoute,
                private reservationApiService: ReservationApiService, private router: Router) {}
    star = [1, 2, 3, 4, 5];
    ngOnInit(): void {
        this.shareDataService.loggedUser$.subscribe((data: user) => {
            this.loggedUser = data;
        });
        this.shareDataService.isLogged$.subscribe((data: boolean) => {
            this.isLoggedin = data;
        });
        this.shareDataService.bookDetails$.subscribe((data: string) => {
            this.bookClicked = data;
            this.bookClicked.loanDuration = this.transalateDuration(this.bookClicked.loanDuration);
        });
        this.title = this.route.snapshot.paramMap.get('title')
    }

    transalateDuration(loanDuration: string) {
        let res:string = "";
        switch (loanDuration) {
            case "QUINDICI": res = "15";
                break;
            case "TRENTA": res = "30";
                break;
            case "QUARANTACINQUE": res = "45";
                break;
            case "SESSANTA": res = "60";
                break;
            default: res = loanDuration;
        }
        console.log(loanDuration + "" + res);
        return res;
    }
    reserveBook() {
        if(this.isLoggedin){
            if(this.loggedUser != null && this.bookClicked.title != "") {
                if (this.loggedUser.username != this.bookClicked.owner.username && this.loggedUser.idToken != null) {
                    this.reservationApiService.reserveBook(this.loggedUser.idToken, new Date(), this.bookClicked, this.loggedUser).subscribe({
                        next: (data) => {
                            console.log("TEMP: reservation success");
                            console.log(data);
                            const navigationExtras: NavigationExtras = {
                                state: {
                                    title: 'PRENOTAZIONE EFFETTUATA CON SUCCESSO!',
                                    subtitle: 'Contatta il proprietario per prelevare il libro',
                                    navigateTo: 'profilo'
                                }
                            }
                            this.router.navigate(['/success'], navigationExtras);
                        },
                        error: (err) => {
                            console.log(err)
                            console.log("TEMP: reservation error");
                        }
                    });
                }
                else {
                    alert("Non puoi prenotare un tuo libro!");
                }
            }
        }
    }
}
