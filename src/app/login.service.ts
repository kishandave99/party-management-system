import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Login } from './interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  doLogin(body: Login){
    return this.http.post(`${environment.url}/login/`, body)
  }

  doLogout(){
    return this.http.post(`${environment.url}/logout/`, {});
  }

}
