import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}
  notifications!: any;
  ngOnInit(): void {
    this.getNumberOfReservations();
  }
  userLogout() {
    this.api.logoutUser().subscribe((res) => {});
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
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
  getNumberOfReservations() {
    this.api
      .getReservations()
      .subscribe((res: any) => (this.notifications = res.length));
  }
}
