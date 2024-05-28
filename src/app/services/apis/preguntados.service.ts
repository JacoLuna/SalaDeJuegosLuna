import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  api: string = "https://opentdb.com/api.php?";
  constructor(private http: HttpClient) {

  }
  get(): Observable<any> {
    return this.http.get<any>(this.api + 'amount=1&encode=url3986');
  }

  // pais(nombrePais:string): Observable<any>{
  //   return this.http.get(this.api +'name/' + nombrePais); 
  // }
}
