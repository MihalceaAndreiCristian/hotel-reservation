import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnInit} from "@angular/core";
import {ReservationService} from "../reservation/reservation.service";
import {Reservation} from "../models/reservation";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,
              private reservationService: ReservationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id){
      let reservation = this.reservationService.getReservation(id);
      if (reservation){
        this.reservationForm.patchValue( reservation );
      }
    }
  }

  reservationForm: FormGroup = new FormGroup({});

  onSubmit(): void {
    if (this.reservationForm.valid) {

      let id = this.activatedRoute.snapshot.paramMap.get("id");
      let reservation: Reservation = this.reservationForm.value;
      if (id){

        this.reservationService.updateReservation(reservation,id);
      }else {
        this.reservationService.addReservation(reservation);
      }

      this.router.navigate(['/list']);
    }


  }
}
