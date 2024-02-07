import {Component, Input, OnInit} from '@angular/core';
import {ShareDataService} from "../service-api/share-data.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-book-card',
    templateUrl: './book-card.component.html',
    styleUrl: './book-card.component.css'
})
export class BookCardComponent implements OnInit{
    @Input() book?: any;
    @Input() position: number = 0;
    private bookClicked?: any = {
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

    constructor(private shareDataService: ShareDataService, private router: Router) { }

    ngOnInit() {
      this.shareDataService.bookDetails$.subscribe((data: string) => {
          this.bookClicked = data;
      });
    }

    clickBook() {
      this.bookClicked = this.book;
      if(this.bookClicked.title != ""){
          this.shareDataService.changeBookDetails(this.bookClicked);
          this.router.navigate(['/catalogo/' + this.bookClicked.title]);
      }
    }
}
