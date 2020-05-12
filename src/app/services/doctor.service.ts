import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  name: string;

  constructor(private http: HttpClient) { }

  getPatients():Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:8080/doctor/patientsList', httpOptions);
  }

  getPatientData(name: string):Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:8080/doctor/'+ name, httpOptions);
  }

  setName(val: string){
    this.name = val;
  }

  getName(){
    return this.name;
  }
}
