import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  role!: String;
  constructor(private api: ApiService, private router: Router) {}
  canActivate(): Boolean {
    this.api.getMyRole().subscribe((res: any) => {
      this.role = res;
    });
    if (this.role == 'user' || this.role == 'admin') return true;
    return false;
  }
}
