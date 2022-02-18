import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalidLogin = false;
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): any {}
  userLogin(data: any) {
    this.api.loginUser(data).subscribe((res) => {
      let boolean = true;
      if (res === 'Incorrect Password or email') {
        this.invalidLogin = true;
      } else {
        this.invalidLogin = false;
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
    });
  }
  route() {
    this.router.navigate(['/signup']);
  }
}
