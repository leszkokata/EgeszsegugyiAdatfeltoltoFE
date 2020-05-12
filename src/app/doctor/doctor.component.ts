import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DoctorService } from '../services/doctor.service';

//paciensek adatmodellje
export interface PatientData {
  name: string;
  email: string;
  password?: string;
  age?: number;
  gender?: string;
  doctor?: string;
}

// orvosok adatmodellje
export interface DoctorData {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  profession: string;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password:string;
  details: boolean;
  patients: any;
  
//  patientName: string;

  dataSource: any;
  patientDataSource: any;

  constructor(private router: Router, public dialog: MatDialog, private loginService: LoginService, private doctorService: DoctorService) {
    this.details = false;
    this.name = this.doctorService.getName();
   }

  ngOnInit(): void {
    this.getPatients();
  }

  displayedColumns: string[] = ['name','email'];
  displayedPatientColumns: string[] = ['bloodpressure', 'weight', 'bloodsugar', 'comment'];

  // paciensek listazasa
  getPatients(){
    this.doctorService.getPatients().subscribe(data => {
      this.patients = data.message;
      //a serverrol erkezo adatok megfelelo formatumra alakitasa
      this.dataSource = this.patients.map(item => {
          return {name: item.name, email: item.email};
      })
      console.log(this.dataSource);
    });
  }

  // egy paciens mereseinek listazasa
  seeDetails(patientName: any): void {
    this.details = true;
   // this.patientName = this.name;
    console.log(patientName);
    this.doctorService.getPatientData(patientName).subscribe(data => {
      this.patients = data.message;
      this.patientDataSource = this.patients.map(item => {
          return {bloodPressure: item.bloodPressure,bloodSugar: item.bloodSugar,
            weight: item.weight, comment:item.comment};
      })
      console.log(this.patientDataSource);
    });
  }

  backToPatients(): void {
    this.details = false;
  }

  navigateBack() {
    this.router.navigate(['/login', {msg: 'I came back from the dashboard'}]);
  }

  //kijelentkezes, visszairanyitas a login oldalra
  clickLogout() {
    this.loginService.logout(this.username, this.password).subscribe(data => {
      localStorage.clear();
      this.router.navigate(['/login']);
    },error =>{
      console.log('error', error);
    });
  }
}
