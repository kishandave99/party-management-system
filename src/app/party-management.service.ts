import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Party } from './interface';

@Injectable({
  providedIn: 'root'
})
export class PartyManagementService {

  constructor(private http: HttpClient) { }

  doGetList(){
    return this.http.get(`${environment.url}/party/`);
  }

  doGet(id: string){
    return this.http.get(`${environment.url}/party/?id=` + id);
  } 

  doSave(body: Party){
    return this.http.post(`${environment.url}/party/`, body);
  }

  doUpdate(id: string, body: Party){
    return this.http.patch(`${environment.url}/party/?id=${id}`, body);
  }

  doDelete(id: string){
    return this.http.delete(`${environment.url}/party/?id=${id}`);
  }

}
