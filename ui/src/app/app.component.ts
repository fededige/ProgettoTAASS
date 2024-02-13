import { Component, OnInit } from '@angular/core';
import {UserApiService} from "./service-api/user-api.service";
import {ShareDataService} from "./service-api/share-data.service";
import {Router} from "@angular/router";
import {user} from "./model/user";

@Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'ReadCycle';
    private isLoggedin?: boolean;
    private loggedUser?: user;

    constructor(private apiService: UserApiService,
                private shareDataService: ShareDataService, private router: Router) {
    }

    ngOnInit() {
        console.log("OnInit");
        this.shareDataService.isLogged$.subscribe((data: boolean) => {
            this.isLoggedin = data;
        });

        this.shareDataService.loggedUser$.subscribe((data: user) => {
            this.loggedUser = data;
        });

        let idToken = this.getIdToken();
        let userEmail = this.getEmail();
        let photoUrl = this.getPhotoUrl();
        if(idToken != null && userEmail != null) {
            this.apiService.login(idToken, userEmail.split('@')[0], userEmail)
                .subscribe({
                    next: (data) => {
                        this.isLoggedin = user != null;
                        this.loggedUser = data;
                        if(photoUrl != null)
                            this.loggedUser.profileImg = photoUrl;
                        if(idToken != null)
                            this.loggedUser.idToken = idToken;
                        console.log("ngOnInit app.component");
                        console.log(this.isLoggedin);
                        this.shareDataService.isLoggedObservable(this.isLoggedin);
                        this.shareDataService.loggedUserObservable(this.loggedUser);
                        this.router.navigate([this.router.url]);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
        } else {
            this.router.navigate(['/unauthorized']);
        }
    }

    getIdToken() {
        return sessionStorage.getItem('idToken');
    }
    getEmail() {
        return sessionStorage.getItem('email');
    }

    getPhotoUrl() {
        return sessionStorage.getItem('photoUrl');
    }
}
