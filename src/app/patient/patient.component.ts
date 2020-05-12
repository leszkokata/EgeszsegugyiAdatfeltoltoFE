import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService, MeasurementModel } from '../services/patient.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

export interface MesurementData {
  patient: string;
  date: Date;
  bloodPressure: number;
  bloodSugar: number;
  weight: number;
  comment: string;
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
  name: string;
  username: string;
  password:string;

  bloodPressure: number;
  weight: number;
  bloodSugar: number;
  comment: string;
  date = new Date();
  mesurements: any;
  dataSource: any;

  constructor(private router: Router,public dialog: MatDialog, private patientService: PatientService, private loginService: LoginService) {
    this.name = this.patientService.getName();
    this.username = this.patientService.getUsername();
  }

  ngOnInit(): void {
    this.getMesurementData();
  }

  displayedColumns: string[] = ['blood-pressure', 'weight', 'blood-sugar', 'comment'];


  openDialog(): void {
    const dialogRef = this.dialog.open(NewDataDialog, {
      width: '250px',
      data: { bloodPressure: this.bloodPressure, weight: this.weight, bloodSugar: this.bloodSugar, comment: this.comment, date: this.date }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this.addMeasurement(result);
      }

    });
  }

  getMesurementData() {
    this.patientService.getMesurementData().subscribe(data => {
      this.mesurements = data.message;
      this.dataSource = this.mesurements.map(item => {
        //const temp = new Array<MesurementData>();
          return {bloodPressure: item.bloodPressure,bloodSugar: item.bloodSugar, patient:item.patient,
            weight: item.weight, comment:item.comment, date: item.date};
      })
      console.log(this.dataSource);
    });
  }

  addMeasurement(result:any) {
    this.patientService.addMeasurement(this.username, result.bloodPressure, result.bloodSugar,
      result.weight, this.date,result.comment).subscribe(data => {
      console.log('data', data);
    }, error => {
      console.log('error', error);
    });
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
  selector: 'new-data-dialog',
  templateUrl: 'new-data-dialog.html',
})
export class NewDataDialog {

  dialogData: MesurementData;
  constructor(
    public dialogRef: MatDialogRef<NewDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MesurementData) {
    this.dialogData = data;
  }

}
