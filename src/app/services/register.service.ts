import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerPatient(name:string, age: number, gender: string, email:string, password: string, 
    doctor: string):Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:8080/registerPatient', { name: name,
    age: age, gender: gender, email: email, password: password, doctor: doctor }, httpOptions);
  }

  registerDoctor(name:string, age: number, gender: string, email:string, password: string, 
    profession: string):Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:8080/registerDoctor', { name: name, age: age,
    gender: gender, email: email, password: password, profession: profession }, httpOptions);
  }
}
