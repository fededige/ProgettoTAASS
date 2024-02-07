import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CatalogApiService } from "../service-api/catalog-api.service";
import { ShareDataService } from "../service-api/share-data.service";
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit {
    @Output() searchValue = new EventEmitter<string>();
    search_field?: string;
    searchResult: string[] = [];
    constructor(private apiService: CatalogApiService, private shareDataService: ShareDataService) { }

    onInput(e: Event) {
        this.search_field = (<HTMLInputElement>e.target).value;
    }

    ngOnInit() {
        this.shareDataService.searchData$.subscribe(res => this.searchResult = res)
    }

    search() {
        this.searchResult = [];
        this.shareDataService.searchDataObservable(this.searchResult);
        this.searchValue.emit(this.search_field);
        if(this.search_field != null){
            this.apiService.searchBooksByTitleAndAuthor(this.search_field)
                .subscribe((data: any) => {
                    console.log(data);
                    this.searchResult = data;
                    this.shareDataService.searchDataObservable(this.searchResult);
                });
        } else {
            alert("searchWord not valid");
        }
    }
}
