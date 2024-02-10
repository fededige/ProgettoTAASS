import {user} from "./user";
import {book} from "./book";
import {reservationBook} from "./reservationBook";
import {reservationUser} from "./reservationUser";

export class reservation {
  id?: number
  date!: Date
  book!: reservationBook
  ReservationUser!: reservationUser
  constructor() { }
}
