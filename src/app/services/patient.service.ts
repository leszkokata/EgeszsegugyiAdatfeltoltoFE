import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  name:string;
  username: string;
  constructor(private http: HttpClient) { }

  
  setName(val: string){
    this.name = val;
  }

  getName(){
    return this.name;
  }

  setUsername(val: string){
    this.username = val;
  }

  getUsername(){
    return this.username;
  }

  getMesurementData(username: string):Observable<any>{
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get('http://localhost:8080/patient/measurementsList');
  }
}
