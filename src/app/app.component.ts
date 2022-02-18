import { Component } from '@angular/core';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Veseeta Project';
  role: any = 'no-access';
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.getMyRole();
  }
  getMyRole() {
    this.api.getMyRole().subscribe((res) => {
      if (res === 'admin' || res === 'user') this.role = res;
    });
  }
}
