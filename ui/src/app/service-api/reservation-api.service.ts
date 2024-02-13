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

    reserveBook(idToken: string, date: Date, book: any, user: user){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + idToken
        });
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
        if( reservation.book.owner != null)
            reservation.book.owner.coins = 0;
        reservation.ReservationUser.username = user.username;
        reservation.ReservationUser.email = user.email;
        reservation.ReservationUser.coins = 0;

        let reservationJSON = JSON.stringify(reservation);
        return this.http.post(this.urlReservation + '/reserveBook', reservationJSON, {headers: headers});
    }

    getUserBooksRead(idToken: string, username?: string) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + idToken
        });
        return this.http.get(this.urlReservation + '/getReservationsBorrowed?username=' + username, { headers: headers });
    }

    getUserBooksLend(idToken: string, username?: string) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + idToken
        });
        return this.http.get(this.urlReservation + '/getReservationsLend?username=' + username, { headers: headers });
    }

    makeBookAvailable(idToken: string, id: number) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + idToken
    });
        return this.http.get(this.urlReservation + '/makeAvailable/' + id, { headers: headers });
    }
}
