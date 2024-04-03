import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Import tap and catchError operators
import { Launch } from '../models/launch.interface';
import { MissionDetails } from '../models/details.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  getLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Handle errors using handleError function
    );
  }

  getLaunchById(id: string): Observable<Launch> {
    return this.http.get<Launch>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError) // Handle errors using handleError function
    );
  }

  getMissionDetails(id: string): Observable<MissionDetails> {
    return this.http.get<MissionDetails>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log('Details:', data)),
      catchError(this.handleError) // Handle errors using handleError function
    );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError('Something went wrong'); // Throw a user-friendly error message
  }
}

