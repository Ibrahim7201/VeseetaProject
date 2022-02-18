import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
interface Reservations {
  _id: String;
  hours: number;
  minutes: number;
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
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css'],
})
export class EditUsersComponent implements OnInit {
  usersArr: User[] = [];
  editMode: Boolean = false;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers() {
    this.api.getUsers().subscribe((response: any) => {
      if (Array.isArray(response)) {
        response.forEach((element: User) => {
          this.usersArr.push(element);
        });
      } else {
        console.log(response);
      }
    });
  }
  deleteUser(data: any) {
    this.api.deleteUser(data).subscribe((res) => {
      location.reload();
    });
  }
}
