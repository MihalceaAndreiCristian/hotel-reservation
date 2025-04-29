import {Injectable} from '@angular/core';
import {Reservation} from '../models/reservation';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];
  private apiUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) {

  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + '/reservations');
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + '/reservation/' + id);
  }

  addReservation(reservation: Reservation) {
    reservation.id = Date.now().toString();
    this.http.post(this.apiUrl + '/reservation', reservation).subscribe(reservation => {console.log(reservation);});
  }

  deleteReservation(id: string) {
    return this.http.delete<void>(this.apiUrl + '/reservation/' + id);

  }

  updateReservation(reservation: Reservation, id: string): Observable<Reservation> {
    return this.http.put<Reservation>(this.apiUrl + '/reservation/' + id, reservation);

  }
}
