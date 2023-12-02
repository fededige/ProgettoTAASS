import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalogo-search',
  templateUrl: './catalogo-search.component.html',
  styleUrl: './catalogo-search.component.css'
})
export class CatalogoSearchComponent {
  @Input() search_value?: string

  ngOnInit(): void {
    // qua serve recuperare i dati relativi alla ricerca
  }
}
