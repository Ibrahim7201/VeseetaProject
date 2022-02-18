import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
interface Reservations {
  _id: String;
  hours: number;
  minutes: number;
  doctor: String;
  specialization: String;
  doctor_id: String;
}
interface User {
  _id: String;
  name: String;
  password: String;
  reservations: Reservations[];
  role: String;
  email: String;
  phones: Number[];
  __v: Number;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  reservationsArr: Reservations[] = [];
  user!: any;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getReservations();
    this.fetchUser();
    setTimeout(() => {});
  }
  getReservations() {
    this.api.getReservations().subscribe((response: any) => {
      if (Array.isArray(response)) {
        response.forEach((element: Reservations) => {
          this.reservationsArr.push(element);
        });
      } else {
        console.log(response);
      }
    });
  }
  cancelReservation(hours: any, minutes: any, doctorID: any) {
    const data = { hours, minutes };
    const data2 = { doctor_id: doctorID, hours, minutes };
    this.api.cancelReservation(data).subscribe((res: any) => {
      console.log(res);
    });
    this.api.cancelReservationDoctor(data2).subscribe((res: any) => {
      console.log(res);
    });
    location.reload();
  }
  fetchUser() {
    this.api.getUserData().subscribe((res) => {
      this.user = res;
    });
  }
}
