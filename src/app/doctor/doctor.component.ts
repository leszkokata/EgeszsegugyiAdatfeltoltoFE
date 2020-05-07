import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DoctorService } from '../services/doctor.service';


export interface PatientData {
  email: string;
  password?: string;
}

export interface PatientDetails {
  bloodPressure: number;
  weight: number;
  bloodSugar: number;
}

const PATIENT_DATA: PatientDetails[] = [
  {bloodPressure: 120, weight:60, bloodSugar:5}
];

const ELEMENT_DATA: PatientData[] = [
  {email: "kisjani@gmail.com"},
  {email: "tesztuser@gmail.com"},
  {email: "abc123@gmail.com"},
  {email: "mindegy@gmail.com"},
  {email: "valami@gmail.com"}
];

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

  constructor(private router: Router, public dialog: MatDialog, private loginService: LoginService, private doctorService: DoctorService) {
    this.details = false;
    this.name = this.doctorService.getName();
   }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['email'];
  displayedPatientColumns: string[] = ['bloodpressure', 'weight', 'bloodsugar'];
  dataSource = ELEMENT_DATA;
  patientDataSource = PATIENT_DATA;


  openDialog(): void {
    const dialogRef = this.dialog.open(NewPatientDialog, {
      width: '250px',
      data: {email: this.email, password: this.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        console.log(result);
      }
      
    });
  }

  
  seeDetails(): void {
    this.details = true;
  }

  backToPatients(): void {
    this.details = false;
  }

  navigateBack() {
    this.router.navigate(['/login', {msg: 'I came back from the dashboard'}]);
  }

  clickLogout() {
    this.loginService.logout(this.username, this.password).subscribe(data => {
      console.log('data',data);
      localStorage.clear();
      this.router.navigate(['/login']);
    },error =>{
      console.log('error', error);
    });
  }
}

@Component({
  selector: 'new-patient-dialog',
  templateUrl: 'new-patient-dialog.html',
})
export class NewPatientDialog {

  dialogData: PatientData;
  constructor(
    public dialogRef: MatDialogRef<NewPatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PatientData) {
      this.dialogData = data;
    }

}
