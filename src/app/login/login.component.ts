import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientData, DoctorData } from '../doctor/doctor.component';
import { MesurementData } from '../patient/patient.component';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string;

  username: string;
  password: string;

  name: string;
  age: number;
  gender: string;
  email: string;
  doctor: string;
  profession: string;

  constructor(private route: ActivatedRoute, private loginService: LoginService, 
    private doctorService: DoctorService, private patientService: PatientService, 
    private router: Router, public dialog: MatDialog,
    private registerService: RegisterService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.route.params.subscribe(params => {
      if (params.msg) {
        this.msg = params.msg;
      }
    })
  }

  clickLogin() {
    this.loginService.login(this.username, this.password).subscribe(data => {
      localStorage.setItem('username', this.username);
      if (
        data.message == "Az orvos bejelentkezese sikeres!") {
        this.router.navigate(['/doctor']);
        this.doctorService.setName(data.name);

      } else {
        this.router.navigate(['/patient']);
        this.patientService.setName(data.name);
        this.patientService.setUsername(data.username);
      }
    }, error => {
      console.log('error', error);
    });
  }

  openRegisterPatientDialog(): void {
    const dialogRef = this.dialog.open(RegisterPatientDialog, {
      width: '250px',
      data: { name: this.name, age: this.age, gender: this.gender, email: this.email, password: this.password, doctor: this.doctor }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this.registerPatient(result);
      }

    });
  }

  openRegisterDoctorDialog(): void {
    const dialogRef = this.dialog.open(RegisterDoctorDialog, {
      width: '250px',
      data: { name: this.name, age: this.age, gender: this.gender, email: this.email, password: this.password, profession: this.profession }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this.registerDoctor(result);
      }

    });
  }

  registerPatient(result:any) {
    this.registerService.registerPatient(result.name, result.age, result.gender,
      result.email, result.password, result.doctor ).subscribe(data => {
      console.log('data', data);
    }, error => {
      console.log('error', error);
    });
  }

  registerDoctor(result:any) {
    this.registerService.registerDoctor(result.name, result.age, result.gender,
      result.email, result.password, result.profession ).subscribe(data => {
      console.log('data', data);
    }, error => {
      console.log('error', error);
    });
  }
}

@Component({
  selector: 'register-patient-dialog',
  templateUrl: 'register-patient-dialog.html',
})
export class RegisterPatientDialog {

  dialogData: PatientData;
  constructor(
    public dialogRef: MatDialogRef<RegisterPatientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PatientData) {
    this.dialogData = data;
  }

}

@Component({
  selector: 'register-doctor-dialog',
  templateUrl: 'register-doctor-dialog.html',
})
export class RegisterDoctorDialog {

  dialogData: DoctorData;
  constructor(
    public dialogRef: MatDialogRef<RegisterDoctorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DoctorData) {
    this.dialogData = data;
  }

}