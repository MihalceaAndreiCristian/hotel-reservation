import { Injectable } from '@angular/core';
import {Reservation} from '../models/reservation';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] =[];

  constructor() {
  let savedReservations = localStorage.getItem('reservations');
  this.reservations = savedReservations? JSON.parse(savedReservations) : [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(r => r.id === id);
  }

  addReservation(reservation: Reservation) {
    reservation.id= Date.now().toString();
    this.reservations.push(reservation);

    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    console.log('Added reservation');

  }

  deleteReservation(id: string) {
    let index = this.reservations.findIndex(r => r.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    console.log('Deleted reservation with id', id);

  }

  updateReservation(reservation: Reservation, id: string): void {
    let index = this.reservations.findIndex(r => r.id === id);
    this.reservations[index] = reservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    console.log('Update reservation');

  }
}
