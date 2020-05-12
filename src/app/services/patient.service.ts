import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Config {
  username: string;
};

export interface MeasurementModel {
  patient: string,
  bloodPressure: number,
  bloodSugar: number,
  weight: number,
  date: Date,
  comment:string
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  name:string;
  username: string;
  measurementData: any;

  constructor(private http: HttpClient) {
   }

  
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

  addMeasurement(username:string, bloodPressure: number, bloodSugar: number, weight:number, date: Date, 
    comment: string):Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:8080/patient/addMeasurement', {patient:username, bloodPressure: bloodPressure,
    bloodSugar: bloodSugar, weight: weight, date: date, comment: comment }, httpOptions);
  }

  getMesurementData():Observable<any>{
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:8080/patient/measurementsList', httpOptions);
  }

}
