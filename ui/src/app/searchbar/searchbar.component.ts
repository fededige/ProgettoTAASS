import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  @Output() searchValue = new EventEmitter<string>()

  seach_field?: string

  onInput(e: Event) {
    this.seach_field = (<HTMLInputElement>e.target).value;
  }

  search() {
    this.searchValue.emit(this.seach_field)
  }
}
