import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private url = 'http://localhost:3000/api/trips'; // ✅ Reusable base URL

  constructor(private http: HttpClient) {}

  // ✅ Fetch all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url).pipe(
      map(trips => trips.map(trip => ({
        ...trip,
        perPerson: parseFloat((trip.perPerson || '0').toString().replace(/[$,]/g, '')) // Convert string price into a number
      })))
    );
  }

  // ✅ Fetch a single trip by tripCode
  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.url}/${tripCode}`); // Append tripCode to URL
  }

  // ✅ Add a new trip
  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  // ✅ Update an existing trip by tripCode
  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.url}/${formData.code}`, formData); // Use PUT for updating
  }
}


