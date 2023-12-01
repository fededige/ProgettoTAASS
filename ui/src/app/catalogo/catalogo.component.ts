import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css', './catalogo.component.scss']
})
export class CatalogoComponent {

  /* DATI CHE ARRIVARENNO DAL DATABASE */
  libriTendenza = [
    {
      "title": "1984",
      "author": "George Orwell",
      "editions": 27,
      "cover": "https://th.bing.com/th/id/OIP.gX0ExEtzFf0AkuD2xmX2iAHaMF?rs=1&pid=ImgDetMain"
    },
    {
      "title": "1984",
      "author": "George Orwell",
      "editions": 27,
      "cover": "https://th.bing.com/th/id/OIP.gX0ExEtzFf0AkuD2xmX2iAHaMF?rs=1&pid=ImgDetMain"
    },
    {
      "title": "1984",
      "author": "George Orwell",
      "editions": 27,
      "cover": "https://th.bing.com/th/id/OIP.gX0ExEtzFf0AkuD2xmX2iAHaMF?rs=1&pid=ImgDetMain"
    },
    {
      "title": "1984",
      "author": "George Orwell",
      "editions": 27,
      "cover": "https://th.bing.com/th/id/OIP.gX0ExEtzFf0AkuD2xmX2iAHaMF?rs=1&pid=ImgDetMain"
    },
  ];

  libriPiuLetti = [
    {
      "title": "Storia di una ladra di libri",
      "author": "Markus Zusak",
      "editions": 10,
      "cover": "https://www.sperling.it/content/uploads/2015/11/978886836304HIG.JPG"
    }, 
    {
      "title": "Storia di una ladra di libri",
      "author": "Markus Zusak",
      "editions": 10,
      "cover": "https://www.sperling.it/content/uploads/2015/11/978886836304HIG.JPG"
    }, 
    {
      "title": "Storia di una ladra di libri",
      "author": "Markus Zusak",
      "editions": 10,
      "cover": "https://www.sperling.it/content/uploads/2015/11/978886836304HIG.JPG"
    },
    {
      "title": "Storia di una ladra di libri",
      "author": "Markus Zusak",
      "editions": 10,
      "cover": "https://www.sperling.it/content/uploads/2015/11/978886836304HIG.JPG"
    }
  ]
}
