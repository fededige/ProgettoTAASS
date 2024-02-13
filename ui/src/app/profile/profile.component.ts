import { Component, OnInit } from '@angular/core';
import { user } from "../model/user";
import { ShareDataService } from "../service-api/share-data.service";
import {ReservationApiService} from "../service-api/reservation-api.service";
import {UserApiService} from "../service-api/user-api.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    loggedUser!: user;
    isLoggedin!: boolean;
    userBooksRead: any[] = [];
    userBooksLend: any[] = [];
    selectedItem: string = "";

    constructor(private shareDataService: ShareDataService, private apiReservationService: ReservationApiService,
                private apiUserService: UserApiService, private socialAuthService: SocialAuthService, private router: Router) { }
    ngOnInit() {
        this.shareDataService.loggedUser$.subscribe((data: user) => {
            this.loggedUser = data;
        });
        this.shareDataService.isLogged$.subscribe((data: boolean) => {
            this.isLoggedin = data;
        });
        if(this.loggedUser.username != null && this.loggedUser.idToken != null) {
            this.apiUserService.updateCoins(this.loggedUser.idToken, this.loggedUser.username).subscribe((data: any) => {
                this.loggedUser.coins = data;
            });
        }
        console.log("OnInit");
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

    logOut(): void {
        sessionStorage.clear();
        this.isLoggedin = false;
        //this.loggedUser = null;
        this.shareDataService.isLoggedObservable(this.isLoggedin);
        // this.shareDataService.loggedUserObservable(this.loggedUser);
        this.socialAuthService.signOut();
        this.router.navigate(['/']);
    }
}
