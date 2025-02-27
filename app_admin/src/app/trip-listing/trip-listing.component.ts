import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { Router } from '@angular/router'; // Import Router for navigation
import { AuthenticationService } from '../services/authentication.service'; // Import AuthenticationService

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService, // Initialize the TripDataService
    private router: Router, // Initialize Router for navigation
    private authenticationService: AuthenticationService // Inject AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  private getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value;
        this.message = value.length > 0
          ? `There are ${value.length} trips available.`
          : 'There were no trips retrieved from the database';
        console.log(this.message);
      },
      error: (error: any) => {
        console.error('Error fetching trips:', error);
      }
    });
  }

  // Navigate to Add Trip page (Only for logged-in users)
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Check if the user is logged in (used in HTML template)
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
