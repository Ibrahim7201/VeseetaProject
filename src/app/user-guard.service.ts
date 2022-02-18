import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router, CanActivate } from '@angular/router';
import { AuthUserService } from './auth-user.service';
@Injectable({
  providedIn: 'root',
})
export class UserGuardService {
  constructor(private router: Router, private auth: AuthUserService) {}
  canActivate(): Boolean {
    if (this.auth.canActivate()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
