import {Component, OnInit} from '@angular/core';
import {CatalogApiService} from "../service-api/catalog-api.service";
@Component({
  selector: 'app-catalogo-default',
  templateUrl: './catalogo-default.component.html',
  styleUrl: './catalogo-default.component.css'
})
export class CatalogoDefaultComponent implements OnInit {

    constructor(private apiService: CatalogApiService) { }

    public libriPiuLetti: any[] = [];
    public libriPiuLettiExist: boolean = false;
    public libriTendenza: any[] = [];
    public libriTendenzaExist: boolean = false;
    public showAllMonthTrendClicked: boolean = false;
    public showAllBestsellersClicked: boolean = false;
    private iconDown = "fa m-1 icon d-none d-sm-inline fa-arrow-circle-down";
    private iconRight= "fa m-1 icon d-none d-sm-inline fa-arrow-circle-right";
    public showMonthTrendIcon = this.iconRight;
    public showBestsellersIcon= this.iconRight;

    ngOnInit(){
        this.apiService.getBestsellers().subscribe((data: any) => {
            console.log(data);
            for(let i = 0; i < data.length; i++){
                let dataJSON = JSON.parse(data[i]);
                if(dataJSON["cover"] == null || dataJSON["cover"] == ""){
                    dataJSON["cover"] = "../../assets/book-default.jpg";
                }
                this.libriPiuLetti.push(dataJSON);
            }
            this.libriPiuLettiExist = true;
        });
        this.apiService.getMonthTrend().subscribe((data: any) => {
            for(let i = 0; i < data.length; i++){
                let dataJSON = JSON.parse(data[i]);
                if(dataJSON["cover"] == null || dataJSON["cover"] == ""){
                    dataJSON["cover"] = "../../assets/book-default.jpg";
                }
                this.libriTendenza.push(dataJSON);
            }
            this.libriTendenzaExist = true;
        });
    }
    showAllMonthTrend() {
        this.showAllMonthTrendClicked = !this.showAllMonthTrendClicked;
        if(!this.showAllMonthTrendClicked){
            this.showMonthTrendIcon = this.iconRight;
        }
        else{
            this.showMonthTrendIcon = this.iconDown;
        }
    }

    showAllBestsellers() {
        this.showAllBestsellersClicked = !this.showAllBestsellersClicked;
        if(!this.showAllBestsellersClicked){
            this.showBestsellersIcon = this.iconRight;
        }
        else{
            this.showBestsellersIcon = this.iconDown;
        }
    }
}
