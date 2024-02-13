import {reservationBook} from "./reservationBook";
import {reservationUser} from "./reservationUser";

export class reservation {
    id?: number
    date!: Date
    book!: reservationBook
    ReservationUser!: reservationUser
    returned?: boolean

    constructor() { }
}
