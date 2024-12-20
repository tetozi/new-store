import { Component } from '@angular/core';
import {  FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  
  });
  constructor(private fb: FormBuilder,
           private authService : AuthService,
           private router : Router) { }
  ngOnit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });


  }

 

  onLogin() {
    if (this.form.invalid) {
      console.log('Form is invalid:', this.form.value);
      return;
    }
    const { email, password } = this.form.value;
  
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed:', err);
       
      }
    });
  }
  
}
