import { Component } from '@angular/core';
import { ServiceApiService } from "../service-api/service-api.service";

@Component({
  selector: 'app-input-book',
  templateUrl: './input-book.component.html',
  styleUrl: './input-book.component.css' ,
})
export class InputBookComponent {
  constructor(private apiService: ServiceApiService) { }
  ngOnInit() {
    this.apiService.insertBook().subscribe( (data) => {
      console.log(data);
    })
  }

}
