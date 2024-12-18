import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {
  isAuthenticated = true

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe({
      next: () => {
        this.isAuthenticated = false
      },
      error: () => {

      }
    })
  }

}