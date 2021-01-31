import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import APIConfig from './api.config.js'


export interface Car {
  _id?: string,
  licensePlate: string,
  model: string,
  brand: string,
  year: number,
  ownerID: string,
  parkingSpaceNumber: number
}

export interface HttpHandler {
  status?: string
  msg?: string
  id?: number
}

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  cars = new Array<Car>()
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) {
  }

  getCar(licensePlate: string) {
    const params = new HttpParams({ fromObject: { licensePlate: licensePlate } })
    const carsObservable = this.http.get<Car[]>(`${APIConfig.baseURL}cars/${licensePlate}`, { params: params, headers: this.headers },)
    carsObservable.subscribe(res => {
      this.cars = res
    })
    return carsObservable
  }

  getAllCars() {
    const carsObservable = this.http.get<Car[]>(`${APIConfig.baseURL}cars`, { headers: this.headers })
    carsObservable.subscribe(res => {
      this.cars = res
    })
    return carsObservable
  }

  postCar(car: Car) {
    const params = new HttpParams({ fromObject: { licensePlate: car.licensePlate, model: car.model, brand: car.brand, ownerID: car.ownerID, year: car.year.toString(), parkingSpaceNumber: car.parkingSpaceNumber.toString() } })
    const result = this.http.post<any>(`${APIConfig.baseURL}cars`, { params: params, headers: this.headers })
    console.log('cadastro finalizado')
    return result
  }

  editCar(id: string, car: Car) {
    const params = new HttpParams({ fromObject: { licensePlate: car.licensePlate.toString(), model: car.model, brand: car.brand, ownerID: car.ownerID, year: car.year.toString(), parkingSpaceNumber: car.parkingSpaceNumber.toString() } })
    const result = this.http.put<HttpHandler>(`${APIConfig.baseURL}cars/${id}`, { params: params, headers: this.headers })
    return result
  }

  deleteCar(id: string) {
    const result = this.http.delete<HttpHandler>(`${APIConfig.baseURL}cars/${id}`, { headers: this.headers })
    result.subscribe((res) => console.log('delete: ', res))
    this.getAllCars()
    return result
  }

}
