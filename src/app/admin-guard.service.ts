import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router, CanActivate } from '@angular/router';
import { AuthAdminService } from './auth-admin.service';
@Injectable({
  providedIn: 'root',
})
export class AdminGuardService {
  constructor(private router: Router, private auth: AuthAdminService) {}
  canActivate(): Boolean {
    if (this.auth.canActivate()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
