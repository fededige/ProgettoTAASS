import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider} from "@abacritt/angularx-social-login";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    socialUser!: SocialUser;
    isLoggedin?: boolean;
    constructor(private formBuilder: FormBuilder, private socialAuthService: SocialAuthService) { }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.socialAuthService.authState.subscribe((user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
            console.log(this.socialUser);
        });
    }
    loginWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    logOut(): void {
        this.socialAuthService.signOut();
    }
}
