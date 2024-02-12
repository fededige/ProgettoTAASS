import {user} from "./user";
import {reservationUser} from "./reservationUser";

export class reservationBook {
    id?: number
    title?: string
    author?: string
    publishingDate?: Date
    available?: boolean
    owner?: reservationUser
  constructor() { }
}
