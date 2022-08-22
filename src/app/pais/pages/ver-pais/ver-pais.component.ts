import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!:Country;//con esto le decimos a typeScript que aunque pais no haya sido inicializado lo maneje como null
  constructor( private activatedRoute:ActivatedRoute, private paisService:PaisService) { }

  ngOnInit(): void {
/*     this.activatedRoute.params.subscribe(({id}) =>{
      console.log(id);
      this.paisService.buscarPais(id)
      .subscribe(pais=>{
        console.log(pais);
      })
    }) */

    //el switchMap es un operador que sirve para recibir un observable y retornar otro que es dependiente del primer observable
    //para usar el switchMap se necesita el pipe
    //basicamente recibe el observable de params se llama a otra funcion que depende del param.id recibido
    //y nos suscribimos al otro observable que nos interesa el del country 
    this.activatedRoute.params.pipe(
      switchMap(({id})=> this.paisService.buscarPais(id)),
      tap(resp=> console.log(resp))//tap dispara un efecto secundario, no esta ejecutando console.log 
      //lo manda a llamar una vez pase por el sitchMap
    ).subscribe(pais=> this.pais=pais[0])

  }

}
