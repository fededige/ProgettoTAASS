import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css', './catalogo.component.scss']
})
export class CatalogoComponent implements OnInit { 
  value?: string

  ngOnInit(): void {
    this.value = ''
  }

  onGetSearchValue(search_value: string) {
    this.value = search_value;
  }
}
