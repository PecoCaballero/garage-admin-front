import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Car, CarsService } from '../car.service';
import { User, UserService } from '../user.service';
import { ParkingSpaceService } from '../parking-space.service';

type UserCar = {
  user: User,
  car: Car
}

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrls: ['./list-cars.component.css']
})
export class ListCarsComponent implements OnInit {

  cars = new Array<Car>()
  users = new Array<User>()
  usersCars = new Array<UserCar>()

  constructor(private rota: ActivatedRoute,
    private local: Location, private carsServ: CarsService, private userServ: UserService, private parkingSpaceServ: ParkingSpaceService) { }

  ngOnInit(): void {
    this.userServ.getAllUsers().subscribe((res) => {
      this.users = res
      console.log('users: ', this.users)

      this.carsServ.getAllCars().subscribe((res) => {
        this.cars = res
        let usersCars = this.cars.map((car) => {
          let user = this.users.find((user) => user.cars.includes(car._id))
          return { car, user }
        })
        this.usersCars = usersCars.sort((a, b) => a.car.parkingSpaceNumber - b.car.parkingSpaceNumber)
        console.log('userCars: ', this.usersCars)
      })
    })

  }

  
  deletar = (list: ListCarsComponent) => (car: Car, userID: string, ) => {
    list.carsServ.deleteCar(car._id)
    let user = list.userServ.users.find((u) => u._id == userID)
    user.cars = user.cars.filter((carID) => carID != car._id)
    list.userServ.editUser(user)
    list.parkingSpaceServ.editParkingSpace({number: car.parkingSpaceNumber, available: true})

    list.carsServ.getAllCars().subscribe((res) => {
      list.cars = res
      let usersCars = list.cars.map((car) => {
        let user = list.users.find((user) => user.cars.includes(car._id))
        return { car, user }
      })
      list.usersCars = usersCars.sort((a, b) => a.car.parkingSpaceNumber - b.car.parkingSpaceNumber)
      console.log('userCars: ', list.usersCars)
    })
  }

}
