import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ShareDataService} from "../service-api/share-data.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
    title: any
    book_details!: any
    bookClicked?: any = {
        "title": "",
        "author": "",
        "publishedDate": "",
        "genre": "",
        "duration": "",
        "condition": "",
        "publisher": "",
        "plot": "",
        "cover": ""
    };
    constructor(private shareDataService: ShareDataService, private route: ActivatedRoute) {}
    star = [1, 2, 3, 4, 5];
    ngOnInit(): void {
        this.shareDataService.bookDetails$.subscribe((data: string) => {
            this.bookClicked = data;
            console.log(this.bookClicked);
        });

        this.title = this.route.snapshot.paramMap.get('title')
    }

  // simulazione chiamata al db
  // this.book_details = {
  //     "title": this.title,
  //     "author": "George Orwell",
  //     "cover": "https://th.bing.com/th/id/OIP.gX0ExEtzFf0AkuD2xmX2iAHaMF?rs=1&pid=ImgDetMain",
  //     "owner": "Francesco",
  //     "price": 4,
  //     "plot": "‘ 1984 ‘ by George Orwell is a dystopian novel set in a totalitarian society led by the omnipresent Big Brother. The story follows Winston Smith, who works for the Ministry of Truth, altering historical records. Discontent with the regime, Winston begins a forbidden relationship with Julia.",
  //     "condition": "bad",
  //     "edition": "1984",
  //     "restitution": 30,
  //     "evaluation": 3.5
  // }
}
