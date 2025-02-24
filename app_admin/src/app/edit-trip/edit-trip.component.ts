import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;  // Form for editing trips
  trip!: Trip;                  // Trip object to hold data
  submitted = false;            // To track form submission
  message: string = '';         // For feedback messages

  // Constructor to initialize form builder, router, and trip service
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  // ngOnInit lifecycle hook to fetch trip data and populate the form
  ngOnInit(): void {
    // Retrieve stored trip code from localStorage
    let tripCode = localStorage.getItem("tripCode");

    if (!tripCode) {
      alert("Something went wrong. Couldn't find tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log('tripCode:', tripCode);

    // Build form structure
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Fetch trip details using the trip code and populate the form
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        this.trip = value;
        this.editForm.patchValue(value[0]); // Populate form with retrieved trip data

        if (!value) {
          this.message = 'No Trip Retrieved!';
        } else {
          this.message = `Trip: ${tripCode} retrieved successfully`;
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.error('Error fetching trip:', error);
      }
    });
  }

  // Method triggered when the form is submitted
  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (value: any) => {
          console.log('Trip updated:', value);
          this.router.navigate(['']); // Navigate back to trip listing
        },
        error: (error: any) => {
          console.error('Error updating trip:', error);
        }
      });
    }
  }

  // Helper function for accessing form fields easily
  get f() { return this.editForm.controls; }
}
