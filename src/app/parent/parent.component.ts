import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

interface Doctor {
  statusMode: boolean;
  timeLeft: String;
  _id: String;
  name: String;
  specialization: String;
  rates: Number[];
  address: String;
  fees: Number;
  phone: Number;
  duration: Number;
  img: String;
  availableHours: Number[];
  __v: Number;
}
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  parentArr: Doctor[] = [];
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.fetchDoctors();
  }
  fetchDoctors() {
    this.api.getDoctors().subscribe((response: any) => {
      if (Array.isArray(response)) {
        response.forEach((element: Doctor) => {
          if (element.timeLeft === 'Not availabe today') {
            element.statusMode = false;
          } else {
            element.statusMode = true;
          }
          this.parentArr.push(element);
        });
      } else {
        console.log(response);
      }
    });
  }
}
