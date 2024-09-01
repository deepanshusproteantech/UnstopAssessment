import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

// export interface Seat {
//   seat_id: number;
//   status: 'available' | 'booked';
//   seat_row: number;
// }

export interface Seat {
  seat_id: number;
  status: string;
  seat_row: number;
}

export interface BookingRequest {
  number_of_seats: number;
}

export interface BookingResponse {
  booked_seats: number[];
}


@Injectable({
  providedIn: 'root'
})
export class SeatService {

  private apiUrl = 'http://localhost:8088';  // Update this to your backend URL

  constructor(private http: HttpClient) { }

  getSeats(): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/seats`);
  }

  bookSeats(number_of_seats: number): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.apiUrl}/book`, { number_of_seats })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        errorMessage = error.error.detail || 'Bad Request';
      } else {
        errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }

  
}
