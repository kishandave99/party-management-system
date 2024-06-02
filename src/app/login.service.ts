import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Login } from './interface';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  doLogin(body: Login){
    return this.http.post(`${environment.url}/login/`, body)
  }

  doLogout(){
    return this.http.post(`${environment.url}/logout/`, {});
  }

  doCheckIsloggedIn() {
    if (localStorage.getItem('token')) {
        this.router.navigateByUrl('/party/list');
    }
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url == '/') {
        this.doCheckIsloggedIn();
    }
  };

}
