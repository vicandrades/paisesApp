import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorPaisResponse } from '../interfaces/error-pais.interface';
import { Country } from '../interfaces/pais.interface';
@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string ='https://restcountries.com/v3.1'

  get httpConstParams():HttpParams {
   return  new HttpParams().set('fields','flags,capital,name,population,cca2');
  }
  constructor( private http: HttpClient) { }

  buscarPaises(termino:string):Observable<Country[] /* | ErrorPaisResponse */>{
    //aca se uso el append para probar su funcionamiento
    const httpParams:HttpParams=new HttpParams().append('fields','flags,capital,name,population,cca2');
    console.log(httpParams);
    const url:string = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[] /* | ErrorPaisResponse*/> (url,{params:httpParams});
  }

  buscarCapital(termino:string):Observable<Country[]>{
    //example manual headers or params {headers: {'fields':['fields','capital'],'anotherHeader':'header'}
    //si la propiedad tiene el mismo nombre que la variable se coloca solo la variable
    //const headers:HttpHeaders=new HttpHeaders();
    const params:HttpParams=new HttpParams().set('fields','flags,capital,name,population,cca2');
    console.log(params);
    const url:string = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url,{params:this.httpConstParams});
  }

  buscarPais(id:string):Observable<Country[]>{
    const url:string = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>(url);
  }

  buscarRegion(region:string):Observable<Country[]>{
    //httpParams es un objeto inmutable solo retorna una nueva instancia
    const httpParams:HttpParams=new HttpParams();//si se crea asi vacio no se podran agregar valores a esta instancia
    //solo retornara otra instancia con los cambios efectuados esto se hizo a modo de prueba y aprendizaje
    const params:HttpParams = httpParams.set('fields','flags,capital,name,population,cca2');
    console.log(httpParams);
    const url:string = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url,{params});
  }
}
