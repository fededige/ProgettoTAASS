import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-success-page',
    templateUrl: './success-page.component.html',
    styleUrl: './success-page.component.css'
})
export class SuccessPageComponent {
    title: string = "";
    subtitle: string = "";
    navigateTo: string = "";
    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        if(navigation != null) {
            const params = navigation.extras.state as {
                title: string,
                subtitle: string,
                navigateTo: string
            };
            this.title = params.title;
            this.subtitle = params.subtitle;
            this.navigateTo = params.navigateTo;
        }
    }
}
