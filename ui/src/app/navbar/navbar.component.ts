import {Component, OnInit} from '@angular/core';
import { ShareDataService } from "../service-api/share-data.service";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
    isLoggedin?: boolean;
    constructor(private shareDataService: ShareDataService) { }

    ngOnInit() {
        this.shareDataService.isLogged$.subscribe((data: boolean) => {
            this.isLoggedin = data;
        });
    }
}
