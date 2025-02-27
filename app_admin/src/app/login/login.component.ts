import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // Error message handling
  public formError: string = '';
  submitted = false;

  // Object to store user credentials
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void { }

  // Method triggered on form submission
  public onLoginSubmit(): void {
    this.formError = '';

    // Validate that all fields are filled
    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Reloads login page for retry
    } else {
      this.doLogin();
    }
  }

  // Handles the login process
  private doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    // Call authentication service to log in
    this.authenticationService.login(newUser, this.credentials.password);

    // If login is successful, navigate to home
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
    } else {
      // Wait for 3 seconds and recheck login status
      setTimeout(() => {
        if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['']);
        }
      }, 3000);
    }
  }
}
