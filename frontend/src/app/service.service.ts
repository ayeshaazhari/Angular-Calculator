import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAll(){
    console.log("get all from service")
    return this.http.get(baseUrl+ '/allExpressions')
  }

  create(data: any){
    return this.http.post(baseUrl + "/createExpression", data);
  }

  delete(id: any){
    return this.http.delete(baseUrl + "/deleteExpression/" + id);
  }
}
