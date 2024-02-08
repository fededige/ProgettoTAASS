import { Component, Input, OnInit } from '@angular/core';
import { ShareDataService } from "../service-api/share-data.service";

@Component({
    selector: 'app-catalogo-search',
    templateUrl: './catalogo-search.component.html',
    styleUrl: './catalogo-search.component.css'
})
export class CatalogoSearchComponent implements OnInit {
    @Input() search_value?: string
    searchResult: string[] = []
    searchBooks: any[] = []

    constructor(private shareDataService: ShareDataService) { }
    ngOnInit(): void {
        this.shareDataService.searchData$.subscribe(data => {
            this.searchResult = data;
            this.searchBooks = [];
            if(this.searchResult[0] != ""){
                for(let i = 0; i < this.searchResult.length; i++){
                    let book = JSON.parse(data[i]);
                    if(book["cover"] == null || book["cover"] == ""){
                      book["cover"] = "../../assets/book-default.jpg";
                    }
                    this.searchBooks.push(book);
                  }
            }
        });
    }
}
