import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from './usuario.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    url = 'http://localhost:9001/usuario';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUsuario(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }

  getUsuarioById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  salvarUsuario(usuario: Usuario): Observable<any> {

    return this.httpClient.post<any>(this.url,usuario)
  }

  excluirUsuario(usuario: Usuario): Observable<any> {

    return this.httpClient.put<any>(this.url,usuario)
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}