import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component'; // Import LoginComponent

export const routes: Routes = [
  { path: '', component: TripListingComponent, pathMatch: 'full' }, // Default route
  { path: 'add-trip', component: AddTripComponent }, // Route for adding a trip
  { path: 'edit-trip', component: EditTripComponent }, // Route for editing a trip
  { path: 'login', component: LoginComponent } // Route for logging in
];
