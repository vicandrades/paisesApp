import { Component } from '@angular/core';
import { error } from 'protractor';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`button{
    margin-right: 5px
  }`
  ]
})
export class PorRegionComponent{

  regiones :string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva :string ='';
  paises :Country[] = [];

  constructor(private paisService:PaisService) { }

  activarRegion(region:string){
    if(this.regionActiva !== region){
        this.regionActiva= region;
        this.paises = [];
        this.paisService.buscarRegion(this.regionActiva)
        .subscribe(paises=>{
          console.log(paises);
            this.paises=paises;
        },error=>{
          this.paises=[];
        },()=>{
          console.log('se completo el subscribe');
        });
    }

  }

  getClaseCss(region:string):string{
    const claseCss:string = (this.regionActiva===region)?'btn btn-primary':'btn btn-outline-primary';
    return claseCss;
  }

}
