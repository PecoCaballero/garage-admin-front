import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car, CarsService } from '../car.service';
import { Location } from "@angular/common";
import { ParkingSpace, ParkingSpaceService } from '../parking-space.service';
import { User, UserService } from '../user.service';


export enum MODE {
  CADASTRAR,
  EDITAR
}


@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent implements OnInit {

  formRegistration: FormGroup
  users = new Array<User>()
  years = new Array<Number>()
  parkingSpaces = new Array<ParkingSpace>()
  modo = MODE.CADASTRAR
  isLoading = false
  feedback = {
    message: '',
    show: false,
    class: 'success'
  }


  constructor(private userServ: UserService, private carsServ: CarsService, private parkingSpaceServ: ParkingSpaceService, private local: Location, private rota: ActivatedRoute,) { }


  ngOnInit(): void {

    this.userServ.getAllUsers().subscribe((res) => {
      this.users = res
      console.log('users: ', this.users)
    })

    let currentYear = new Date().getFullYear()

    for (var year = 1900; year <= currentYear; year++) {
      this.years.push(year)
    }

    let car = {
      licensePlate: null,
      model: null,
      brand: null,
      year: null,
      ownerID: null,
      parkingSpaceNumber: null
    }
    this.initForm()
    const url = this.rota.snapshot.url[0].path
    if (url == 'edit-car') {
      this.modo = MODE.EDITAR
      const id = this.rota.snapshot.paramMap.get("id")
      car = this.carsServ.cars.find((car) => car._id == id)
      this.formRegistration.get("owner").setValue(car.ownerID, { emitEvent: false });
      this.formRegistration.get("licensePlate").setValue(car.licensePlate, { emitEvent: false });
      this.formRegistration.get("model").setValue(car.model, { emitEvent: false });
      this.formRegistration.get("brand").setValue(car.brand, { emitEvent: false });
      this.formRegistration.get("parkingSpaceNumber").setValue(car.parkingSpaceNumber, { emitEvent: false });


      this.parkingSpaceServ.getParkingSpaces().subscribe((res) => {
        res.push({ number: car.parkingSpaceNumber, available: true })
        this.parkingSpaces = res.sort((a, b) => a.number - b.number)
        console.log(this.parkingSpaces)
      })
    } else {

      this.parkingSpaceServ.getParkingSpaces().subscribe((res) => {
        this.parkingSpaces = res
        console.log('vagas: ', this.users)
      })
    }

  }

  private initForm() {
    this.formRegistration = new FormGroup({
      owner: new FormControl(""),
      licensePlate: new FormControl(null),
      year: new FormControl(this.years[this.years.length - 1]),
      model: new FormControl(null),
      brand: new FormControl(null),
      parkingSpaceNumber: new FormControl(""),
    })
    console.log('initForm: ', this.formRegistration)
  }

  onSubmit() {
    this.isLoading = true
    let car = {
      ownerID: this.formRegistration.get('owner').value,
      licensePlate: this.formRegistration.get('licensePlate').value,
      model: this.formRegistration.get('model').value,
      brand: this.formRegistration.get('brand').value,
      year: parseInt(this.formRegistration.get('year').value),
      parkingSpaceNumber: parseInt(this.formRegistration.get('parkingSpaceNumber').value),
    } as Car
    if (this.modo == MODE.CADASTRAR) {
      console.log('cadastrando...', car);
      const result = this.carsServ.postCar(car)
      result.subscribe((res) => {
        console.log('cadastro res: ', res)
        if (res._id != null) {
          let user = this.userServ.users.find((user) => user._id == res.ownerID)
          user.cars.push(res._id);
          this.userServ.editUser(user)
          this.parkingSpaceServ.editParkingSpace({ number: res.parkingSpaceNumber, available: false })
          this.feedback = {
            message: 'Cadastrado com sucesso!',
            show: true,
            class: 'success'
          }
        } else {
          this.feedback = {
            message: res.msg ?? 'Ocorreu um erro! Tente novamente mais tarde',
            show: true,
            class: 'error'
          }
        }
      })
    } else {
      let id = this.rota.snapshot.paramMap.get("id")
      const result = this.carsServ.editCar(id, car)
      result.subscribe((res) => {
        console.log('edit res: ', res)
        if (res.status = 'success') {
          let oldCar = this.carsServ.cars.find((car) => car._id == id)
          if (oldCar.parkingSpaceNumber != car.parkingSpaceNumber) {
            this.parkingSpaceServ.editParkingSpace({ number: oldCar.parkingSpaceNumber, available: true })
            this.parkingSpaceServ.editParkingSpace({ number: car.parkingSpaceNumber, available: false })
          }
          this.feedback = {
            message: res.msg ?? 'Editado com sucesso!',
            show: true,
            class: 'success'
          }
        } else {
          this.feedback = {
            message: res.msg ?? 'Ocorreu um erro! Tente novamente mais tarde',
            show: true,
            class: 'error'
          }
        }
      })
    }
    setTimeout(() => {
      this.feedback = {
        message: '',
        show: false,
        class: 'success'
      }
    }, 5000);
    this.isLoading = false
  }

  get textoBotao() {
    return this.modo == MODE.CADASTRAR ? 'Cadastrar' : 'Editar'
  }

  get titulo() {
    return this.modo == MODE.CADASTRAR ? 'Cadastrar novo carro' : 'Editar carro'
  }

}
