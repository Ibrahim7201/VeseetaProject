import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthAdminService {
  role!: String;
  constructor(private api: ApiService, private router: Router) {}
  canActivate(): Boolean {
    this.api.getMyRole().subscribe((res: any) => {
      this.role = res;
    });
    if (this.role == 'admin') return true;
    return false;
  }
}
