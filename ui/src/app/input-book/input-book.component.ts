import { Component } from '@angular/core';
import { ServiceApiService } from "../service-api/service-api.service";

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
    selector: 'app-input-book',
    templateUrl: './input-book.component.html',
    styleUrl: './input-book.component.css' ,
})
export class InputBookComponent {
    constructor(private apiService: ServiceApiService) { }

    public books: any[] = [];

    public book = {
      "title": "",
      "author": "",
      "publishedDate": "",
      "plot": "",
      "cover": ""
    }

    public durataDict: any = {
        "15 giorni": "QUINDICI",
        "30 giorni": "TRENTA",
        "45 giorni": "QUARANTACINQUE",
        "60 giorni": "SESSANTA",
    }

    public publishedDate?: Date;

    public selectedFile?: ImageSnippet;

    ngOnInit() {

    }

  insertBook(titolo: string, autore: string, annoPubblicazione: string, genere: string,
             durataPrestito: string, condizioni: string, casaEditrice: string, plot: string) {
        if(titolo == null || autore == null || annoPubblicazione == null ||
            durataPrestito == null || condizioni == null || casaEditrice == null){
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
        this.apiService.insertBook(titolo, autore, annoPubblicazione, genere, this.durataDict[durataPrestito], condizioni, casaEditrice, plot, cover)
            .subscribe( (data) => {
              console.log(data);
        });
    }

    getBookInfos(isbn: string) {
      if(isbn != ""){
        this.apiService.isbnAPI(isbn).subscribe((data: any) => {
          this.books = [];
          const items = data["items"];
          for (let i  = 0; i < items.length; i++){
            this.books?.push({
              title : items[i]["volumeInfo"]["title"],
              author : items[i]["volumeInfo"]["authors"][0],
              publishedDate : items[i]["volumeInfo"]["publishedDate"],
              cover: items[i]["volumeInfo"].hasOwnProperty("imageLinks")  ? items[i]["volumeInfo"]["imageLinks"]["thumbnail"] : "",
              plot : items[i]["volumeInfo"]["description"],
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
        if(!selectedBook.publishedDate.includes("-")){
            let temp = "01/01/" + selectedBook.publishedDate;
            this.publishedDate = new Date(temp);
        }
        else{
          this.publishedDate = new Date(selectedBook.publishedDate);
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
        });
        reader.readAsDataURL(file);
    }
}
