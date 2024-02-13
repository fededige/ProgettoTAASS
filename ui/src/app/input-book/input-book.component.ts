import {Component, OnInit} from '@angular/core';
import { BookApiService } from "../service-api/book-api.service";
import {NavigationExtras, Router} from "@angular/router";
import {ShareDataService} from "../service-api/share-data.service";
import {user} from "../model/user";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
    selector: 'app-input-book',
    templateUrl: './input-book.component.html',
    styleUrl: './input-book.component.css' ,
})
export class InputBookComponent implements OnInit{
    private loggedUser?: user;
    private isLogged?: boolean;
    constructor(private apiService: BookApiService, private router: Router, private shareDataService: ShareDataService) { }

    ngOnInit(): void {
        this.shareDataService.isLogged$.subscribe((data: boolean) => {
            this.isLogged = data;
        });
        this.shareDataService.loggedUser$.subscribe((data: user) => {
          this.loggedUser = data;
        });
    }

    public books: any[] = [];

    public book = {
        "title": "",
        "author": "",
        "publishedDate": "",
        "plot": "",
        "cover": ""
    }

    public selectedFile?: ImageSnippet;

    public hasCover?: boolean = false;

    public coverToShow?: string;

    insertBook(titolo: string, autore: string, annoPubblicazione: string, genere: string,
               durataPrestito: string, condizioni: string, casaEditrice: string, plot: string) {
        if(titolo == "" || autore == "" || annoPubblicazione == "" ||
            durataPrestito == "Seleziona..." || condizioni == "Seleziona..." || casaEditrice == ""){
            alert("titolo, autore, annoPubblicazione, durataPrestito, condizioni, casaEditrice sono campi required");
            return;
        }
        let cover:string = "";
        if(this.book.cover != ""){
            cover = this.book.cover;
        }
        else if(this.selectedFile != null){
            cover = this.selectedFile["src"];
        }
        if(this.isLogged && this.loggedUser != null){
            this.apiService.insertBook(titolo, autore, annoPubblicazione, genere, durataPrestito, condizioni, casaEditrice, plot, cover, this.loggedUser)
                .subscribe({
                    next: (data) => {
                        if(data.status == 200) {
                            const navigationExtras: NavigationExtras = {
                                state: {
                                    title: 'GRAZIE PER AVER INSERITO UN NUOVO LIBRO!',
                                    subtitle: 'A breve riceverai la tua ricompensa in coin',
                                    navigateTo: 'catalogo'
                                }
                            }
                            this.router.navigate(['/success'], navigationExtras);
                        }
                    },
                    error: (err) => {
                        console.log(err)
                    }
                });
        }
    }

    getBookInfos(isbn: string) {
        if(isbn != ""){
            this.apiService.isbnAPI(isbn).subscribe((data: any) => {
                this.books = [];
                const items = data["items"];
                for (let i  = 0; i < items.length; i++){
                    let bookCover: string;
                    if(items[i]["volumeInfo"].hasOwnProperty("imageLinks")){
                        bookCover = items[i]["volumeInfo"]["imageLinks"]["thumbnail"];
                    } else {
                        bookCover = ""
                    }
                    this.books?.push({
                        title : items[i]["volumeInfo"].hasOwnProperty("title") ?
                            items[i]["volumeInfo"]["title"] : "",
                        author : items[i]["volumeInfo"].hasOwnProperty("authors") ?
                            items[i]["volumeInfo"]["authors"][0] : "",
                        publishedDate : items[i]["volumeInfo"].hasOwnProperty("publishedDate") ?
                            items[i]["volumeInfo"]["publishedDate"] : "",
                        cover: bookCover,
                        plot : items[i]["volumeInfo"].hasOwnProperty("description") ?
                            items[i]["volumeInfo"]["description"] : "",
                    });
                }
            });
        }
        else {
            alert("ISBN non inserito");
        }
    }
    selectBook(selectedBook: any) {
        this.books = [];
        if(selectedBook.cover != ""){
            this.hasCover = true;
            this.coverToShow = selectedBook.cover;
        }
        else {
            this.coverToShow = "";
            this.hasCover = false;
        }
        if(!selectedBook.publishedDate.includes("-")){
            let temp = selectedBook.publishedDate + "-01-01";
            this.book.publishedDate = temp;
        }
        else{
          this.book.publishedDate = selectedBook.publishedDate;
        }
        this.book.title = selectedBook.title;
        this.book.author = selectedBook.author;
        this.book.plot = selectedBook.plot;
        this.book.cover = selectedBook.cover;
    }
    processFile(imageInput: any) {
        const file: File = imageInput.files[0];
        console.log(file);
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
            console.log(this.selectedFile);
            this.coverToShow = this.selectedFile["src"];
            this.hasCover = true;
        });
        reader.readAsDataURL(file);
    }
}
