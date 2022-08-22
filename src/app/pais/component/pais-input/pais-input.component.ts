import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit{
  
  
  //es de tipo string porque se quiere emitir el valor de termino
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  termino:string='';
  debouncer:Subject<string>= new Subject;
  @Input()
  placeHolder:string='';
  
  ngOnInit() {
    //se hizo de esta manera para poder manejar el valor como un observable y poder usar el pipe
    //pipe permite controlar la salida al subscribe
    //debounceTime configura no emitir  o ejecutar el subscribe hasta que el observable deje de emitir valores 
    //por mas de 300 milesimas de seg
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(valor =>{
      console.log('debouncer',valor);
      this.onDebounce.emit(valor);
    })
  }

  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(){
    //debouncer:Subject, parece que se puede usar como observer y observable
    //con next emitimos el siguiente valor y lo podemos manejar como un observable
    this.debouncer.next(this.termino);
  }

}
