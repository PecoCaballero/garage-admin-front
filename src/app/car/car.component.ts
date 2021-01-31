import { Component, Input, OnInit } from '@angular/core';
import { Car, CarsService } from '../car.service';
import { ParkingSpaceService } from '../parking-space.service';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  @Input() car: Car
  @Input() user: User
  @Input() deletar: (car: Car, userID: string) => void

  constructor() { }
  ngOnInit(): void {
  }


}
