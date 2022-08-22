import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {

  paises:Country[]=[];
  termino:string='';
  isError:boolean=false;
  mostrarSugeridos: boolean =false;
  paisesSugeridos: Country[]=[];
  constructor(private paisService:PaisService) { }

  buscar(termino:string){
    this.termino=termino;
    this.isError=false;
    console.log(termino);

    this.paisService.buscarCapital(termino)
    .subscribe(resp=>{
      console.log(resp);
      this.isError=false;
      this.paises=resp;
    },error=>{
      this.isError=true;
      this.paises=[];
    },()=>{
      console.log('complete del subscribe');
    });
  }
  sugerencias(termino:string){
    this.isError=false;
    this.termino=termino;
    this.mostrarSugeridos=false;
    if(termino.length>0){
      this.mostrarSugeridos=true;
      this.paisService.buscarCapital(termino)
      .subscribe(paises => this.paisesSugeridos = paises.splice(0,5),
      error=>this.paisesSugeridos=[]);
    }else{
      this.paisesSugeridos=[];
    }
  }
}
