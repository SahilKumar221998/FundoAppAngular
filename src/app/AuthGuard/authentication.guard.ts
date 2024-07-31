import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './../service/AuthService/auth-service.service'; // Adjust import based on your structure

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) { }

  canActivate(): boolean {
    const token = this.authService.gettoken(); 

    if (token) {
      return true; // Allow access
    } else {
      this.router.navigateByUrl("");
      return false; // Deny access
    }
  }
}
