import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from './usuario.model';
import { createRequestOption } from './shared/utils';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    url = 'http://localhost:9001/usuario';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
/*
  getUsuario(req?: any): Observable<any[]> {

    const options = createRequestOption(req);

    return this.httpClient.get<any[]>(this.url, { params: options, observe: 'response' });
  
  }*/

  getUsuario(req?: any): Observable<any> {
    const options = createRequestOption(req);

    return this.httpClient.get<any[]>(this.url, { params: options, observe: 'response' });
  }

  salvarUsuario(usuario: Usuario): Observable<any> {

    return this.httpClient.post<any>(this.url,usuario)
  }

  excluirUsuario(usuario: Usuario): Observable<any> {

    return this.httpClient.put<any>(this.url,usuario)
  }

  queryUsuario(req?: any): Observable<any> {
    const options = createRequestOption(req);

    return this.httpClient.get<any[]>(this.url+"/flter", { params: options, observe: 'response' });
  }
}