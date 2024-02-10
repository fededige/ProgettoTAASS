import { Component, OnInit } from '@angular/core';
import { user } from "../model/user";
import { ShareDataService } from "../service-api/share-data.service";
import {Router} from "@angular/router";
import {ReservationApiService} from "../service-api/reservation-api.service";
import {reservation} from "../model/reservation";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    loggedUser!: user
    userBooksRead: any[] = []
    selectedItem: string = ""

    constructor(private shareDataService: ShareDataService, private router: Router, private apiService: ReservationApiService) { }
    ngOnInit() {
        this.shareDataService.loggedUser$.subscribe((data: user) => {
            this.loggedUser = data;
        });
    }

    libriLettiClick() {
        this.selectedItem = "libriLetti"
        this.router.navigate(['/profilo/libri']);
        this.apiService.getUserBooksRead(this.loggedUser.username).subscribe((data: any) => {
            console.log(data);
            for(let i = 0; i < data.length; i++){
                let dataJSON = JSON.parse(data[i]);
                this.userBooksRead.push(dataJSON);
            }
        });
    }

    libriPrestatiClick() {
        this.selectedItem = "libriPrestati"
    }

    recensioniClick() {
        this.selectedItem = "recensioni"
    }
}
