import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginService } from '../services/login.service';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string;

  username: string;
  password: string;

  constructor(private route: ActivatedRoute, private loginService: LoginService, 
    private doctorService: DoctorService, private patientService: PatientService, 
    private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    this.route.params.subscribe(params => {
      console.log(params);
      if (params.msg) {
        this.msg = params.msg;
      }
    })
  }

  clickLogin() {
    this.loginService.login(this.username, this.password).subscribe(data => {
      console.log('data', data);
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
}
