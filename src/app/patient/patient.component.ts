import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from '../services/patient.service';

export interface PatientData {
  bloodPressure: number;
  weight: number;
  bloodSugar: number;
}

export interface MesurementData {
  patient: string;
  date: Date,
  bloodPressure: number,
  bloodSugar: number,
  weight: number,
  comment: string
}

const ELEMENT_DATA: PatientData[] = [
  { bloodPressure: 120, weight: 60, bloodSugar: 5 },
  { bloodPressure: 120, weight: 61, bloodSugar: 6 },
  { bloodPressure: 123, weight: 59, bloodSugar: 5 },
  { bloodPressure: 120, weight: 61, bloodSugar: 5 },
  { bloodPressure: 121, weight: 60, bloodSugar: 6 },
  { bloodPressure: 120, weight: 59, bloodSugar: 5 },
  { bloodPressure: 119, weight: 60, bloodSugar: 5 }
];

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
  name: string;
  username: string;

  bloodPressure: number;
  weight: number;
  bloodSugar: number;

  mesurements: any;

  constructor(public dialog: MatDialog, private patientService: PatientService) {
    this.name = this.patientService.getName();
    this.username = this.patientService.getUsername();
  }

  ngOnInit(): void {
    this.getMesurementData();
    //console.log("mesurements:" + this.mesurements);
  }

  displayedColumns: string[] = ['blood-pressure', 'weight', 'blood-sugar'];
  dataSource = ELEMENT_DATA;

  openDialog(): void {
    const dialogRef = this.dialog.open(NewDataDialog, {
      width: '250px',
      data: { bloodPressure: this.bloodPressure, weight: this.weight, bloodSugar: this.bloodSugar }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
      }

    });
  }

  getMesurementData() {
    this.mesurements = this.patientService.getMesurementData(this.username).subscribe(data => {
      console.log('data', data);
      //localStorage.setItem('username', this.username);
      //  this.patientService.setName(data.name);

      
    }, error => {
      console.log('error', error);
    });
  }
  
}

@Component({
  selector: 'new-data-dialog',
  templateUrl: 'new-data-dialog.html',
})
export class NewDataDialog {

  dialogData: PatientData;
  constructor(
    public dialogRef: MatDialogRef<NewDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PatientData) {
    this.dialogData = data;
  }

}
