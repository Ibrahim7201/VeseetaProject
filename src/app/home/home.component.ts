import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  getCookie(key: any): any {
    let val = '';
    let x = document.cookie;
    let y = x.split(';');
    for (let i in y) {
      let test = y[i].split('=');
      if (test[0].trim() === key) {
        return test[1];
      }
    }
  }
  routeLogin() {
    this.router.navigate(['/login']);
  }
  routeSignUp() {
    this.router.navigate(['/signup']);
  }
  checkLogging(): Boolean {
    if (this.getCookie('name')) {
      return false;
    } else {
      return true;
    }
  }
}
