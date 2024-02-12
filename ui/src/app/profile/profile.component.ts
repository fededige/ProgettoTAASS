import { Component, OnInit } from '@angular/core';
import { user } from "../model/user";
import { ShareDataService } from "../service-api/share-data.service";
import {ReservationApiService} from "../service-api/reservation-api.service";
import {UserApiService} from "../service-api/user-api.service";
import {BookApiService} from "../service-api/book-api.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    loggedUser!: user;
    userBooksRead: any[] = [];
    userBooksLend: any[] = [];
    userBookInsert: any[] = []
    selectedItem: string = "";

    constructor(private shareDataService: ShareDataService, private apiReservationService: ReservationApiService,
                private apiUserService: UserApiService, private apiBookService: BookApiService) { }
    ngOnInit() {
        this.shareDataService.loggedUser$.subscribe((data: user) => {
            this.loggedUser = data;
        });
        if(this.loggedUser.username != null && this.loggedUser.idToken != null) {
            this.apiUserService.updateCoins(this.loggedUser.idToken, this.loggedUser.username).subscribe((data: any) => {
                this.loggedUser.coins = data;
            });
        }
    }

    libriLettiClick() {
        this.selectedItem = "libriLetti";
        this.userBooksRead = [];
        this.apiReservationService.getUserBooksRead(this.loggedUser.username).subscribe((data: any) => {
            console.log(data);
            for(let i = 0; i < data.length; i++){
                let dataJSON = JSON.parse(data[i]);
                this.userBooksRead.push(dataJSON);
            }
        });
    }

    libriPrestatiClick() {
        this.selectedItem = "libriPrestati"
        this.userBooksLend = [];
        this.apiReservationService.getUserBooksLend(this.loggedUser.username).subscribe((data: any) => {
           console.log(data);
           for(let i = 0; i < data.length; i++) {
               let dataJSON = JSON.parse(data[i]);
               this.userBooksLend.push(dataJSON);
           }
        });
    }

    recensioniClick() {
        this.selectedItem = "recensioni"
    }
}
