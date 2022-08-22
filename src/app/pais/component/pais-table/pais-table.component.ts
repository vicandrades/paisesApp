import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-table',
  templateUrl: './pais-table.component.html',
  styleUrls: []
})
export class PaisTableComponent{

  @Input()
  paises:Country[]=[];
  constructor() { }


}
