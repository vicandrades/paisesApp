import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li {
    cursor: pointer;
  }`
  ]
})
export class PorPaisComponent {

  paises:Country[]=[];
  termino:string='';
  isError:boolean=false;
  paisesSugeridos: Country[]=[];
  mostrarSugeridos: boolean=false;
  constructor(private paisService:PaisService) { }

  buscar(termino:string){
    this.paisesSugeridos=[];
    this.mostrarSugeridos=false;
    this.termino=termino;
    this.isError=false;
    console.log(termino);
    this.paisService.buscarPaises(termino)
    .subscribe((paises)=> {     
          console.log(paises);
          //paises.
          /* if(resp.status)
            this.isError=true; */
          this.paises=paises;
        },error=>{
          console.log('error');
          console.info(error);
          this.isError=true;
          this.paises=[];
        },()=>{
          console.log('se completo el subscribe');
        }
    );

  }

  sugerencias(termino:string){
    this.isError=false;
    this.termino=termino;
    this.mostrarSugeridos=false;
    if(termino.length>0){
      this.mostrarSugeridos=true;
      this.paisService.buscarPaises(termino)
      .subscribe(paises => this.paisesSugeridos = paises.splice(0,5),
      error=>this.paisesSugeridos=[]);
    }else{
      this.paisesSugeridos=[];
    }
  }
}
