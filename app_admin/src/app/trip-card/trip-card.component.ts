import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation
import { Trip } from '../models/trip'; // Import the Trip model
import { AuthenticationService } from '../services/authentication.service'; // Import AuthenticationService

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input() trip: any; // Receives trip data from trip-listing.component.html

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService // Inject AuthenticationService
  ) {}

  ngOnInit(): void {}

  // Method to handle editing a trip
  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode'); // Clear existing tripCode
    localStorage.setItem('tripCode', trip.code); // Set the current tripCode for editing
    this.router.navigate(['edit-trip']); // Navigate to edit-trip route
  }

  // Check if the user is logged in (called in HTML template)
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
