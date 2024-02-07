import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class CatalogApiService {

    constructor(private http: HttpClient) { }
    private urlCatalog = 'http://localhost:8080/catalog';

    getBestsellers(){
        return this.http.get(this.urlCatalog + '/getBestsellers');
    }
    getMonthTrend(){
        return this.http.get(this.urlCatalog + '/getMonthTrend');
    }
    searchBooksByTitleAndAuthor(searchWord: string){
        return this.http.get(this.urlCatalog + '/getBySearchWord?search=' + searchWord );
    }
}

