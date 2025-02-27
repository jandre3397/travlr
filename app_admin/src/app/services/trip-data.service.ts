import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private baseUrl = 'http://localhost:3000/api'; // Base API URL

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage // Inject storage provider
  ) {}

  // Fetch all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`).pipe(
      map(trips => trips.map(trip => ({
        ...trip,
        perPerson: parseFloat((trip.perPerson || '0').toString().replace(/[$,]/g, '')) // Convert price to number
      })))
    );
  }

  // Fetch a single trip by tripCode
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${tripCode}`);
  }

  // Add a new trip
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.baseUrl}/trips`, formData);
  }

  // Update an existing trip
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/trips/${formData.code}`, formData);
  }

  // Delete a trip (Optional)
  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/trips/${tripCode}`);
  }

  // Login: Calls /login endpoint and returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Register: Calls /register endpoint and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // Helper method for authentication API calls (login/register)
  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }
}


