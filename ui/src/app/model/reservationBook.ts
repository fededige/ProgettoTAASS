import {user} from "./user";

export class reservationBook {
    id?: number
    title?: string
    author?: string
    publishingDate?: Date
    available?: boolean
    owner?: user
  constructor() { }
}
