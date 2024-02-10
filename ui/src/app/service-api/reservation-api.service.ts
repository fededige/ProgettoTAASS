import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { reservation } from "../model/reservation";
import { book } from "../model/book";
import { user } from "../model/user";
import { reservationBook } from "../model/reservationBook";
import {reservationUser} from "../model/reservationUser";

@Injectable({
    providedIn: 'root'
})
export class ReservationApiService {
    constructor(private http: HttpClient) { }
    private urlReservation = 'http://localhost:8080/reservation';
    private tempUrl = "";

    reserveBook(date: Date, book: any, user: user){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        let reservation: reservation = {
            date: date,
            book: new reservationBook(),
            ReservationUser: new reservationUser()
        };
        reservation.book.title = book.title;
        reservation.book.author = book.author;
        reservation.book.publishingDate = book.publishingDate;
        reservation.book.available = book.available;
        reservation.book.owner = book.owner;
        reservation.ReservationUser.username = user.username;
        reservation.ReservationUser.email = user.email;

        let reservationJSON = JSON.stringify(reservation);
        console.log("RESERVATIONJSON");
        console.log(reservationJSON);
        return this.http.post(this.urlReservation + '/reserveBook', reservationJSON, {headers: headers});
    }

    getUserBooksRead(username?: string) {
        // da controllare questo username?
        return this.http.get(this.urlReservation + '/getReservationsBorrowed?username=' + username);
    }
}
