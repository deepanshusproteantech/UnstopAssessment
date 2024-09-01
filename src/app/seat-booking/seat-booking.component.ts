import { Component, OnInit } from '@angular/core';
import { Seat, SeatService } from '../seat.service';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements OnInit {

  seats: Seat[] = [];
  seatCount: number = 1;
  bookedSeats: number[] = [];
  errorMessage: string | null = null;

  constructor(private seatService: SeatService) { }

  ngOnInit(): void {
    this.loadSeats();
  }

  loadSeats(): void {
    this.seatService.getSeats().subscribe(seats => {
      this.seats = seats;
    });
  }

  bookSeats(): void {
    if (this.seatCount < 1 || this.seatCount > 7) {
      alert('You can only book between 1 and 7 seats.');
      return;
    }

    this.seatService.bookSeats(this.seatCount).subscribe({
      next: response => {
        this.bookedSeats = response.booked_seats;
        this.errorMessage = null; // Clear any previous error messages
        this.loadSeats();  // Reload seats to reflect changes
      },
      error: error => {
        this.errorMessage = error;
        this.bookedSeats = []; // Clear booked seats on error
      }
    });
  }

  // Helper method to get seat rows (1 to 12)
  getSeatRows(): number[] {
    const totalRows = Math.max(...this.seats.map(seat => seat.seat_row));
    return Array.from({ length: totalRows }, (_, i) => i + 1);
  }

  // Helper method to get seats in a specific row
  getSeatsInRow(row: number): Seat[] {
    return this.seats.filter(seat => seat.seat_row === row);
  }

}
