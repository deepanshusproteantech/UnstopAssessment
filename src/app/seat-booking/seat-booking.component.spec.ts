import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatBookingComponent } from './seat-booking.component';

describe('SeatBookingComponent', () => {
  let component: SeatBookingComponent;
  let fixture: ComponentFixture<SeatBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatBookingComponent]
    });
    fixture = TestBed.createComponent(SeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
