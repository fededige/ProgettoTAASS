import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider} from "@abacritt/angularx-social-login";
import { UserApiService } from "../service-api/user-api.service";
import { ShareDataService } from "../service-api/share-data.service";
import { user } from "../model/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    // loginForm!: FormGroup;
    isLoggedin?: boolean;
    loggedUser!: user;
    constructor(private socialAuthService: SocialAuthService, private apiService: UserApiService, private shareDataService: ShareDataService) { }
    ngOnInit() {
        this.shareDataService.isLogged$.subscribe((data: boolean) => {
            this.isLoggedin = data;
        });

        this.socialAuthService.authState.subscribe((user) => {
            console.log(user);
            this.apiService.login(user.idToken, user.name, user.email)
                .subscribe({
                    next: (data) => {
                        console.log("Authentication success");
                        this.isLoggedin = user != null;
                        this.loggedUser = data;
                        this.shareDataService.userLoggedObservable(this.isLoggedin);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
        });
    }
    loginWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    logOut(): void {
        this.socialAuthService.signOut();
    }
}
