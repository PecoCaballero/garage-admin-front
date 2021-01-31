import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import APIConfig from './api.config.js'

export interface ParkingSpace {
  _id?: string,
  number: number,
  available: boolean
}

export interface HttpHandler {
  status?: string
  msg?: string
  id?: number
}


@Injectable({
  providedIn: 'root'
})
export class ParkingSpaceService {

  parkingSpaces = new Array<ParkingSpace>()
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) { }


  getParkingSpaces() {
    const parkingSpacesObservable = this.http.get<ParkingSpace[]>(`${APIConfig.baseURL}parkingSpaces`, { headers: this.headers })
    parkingSpacesObservable.subscribe(res => {
      this.parkingSpaces = res
    })
    return parkingSpacesObservable
  }

  editParkingSpace({ number, available }: ParkingSpace) {
    const params = new HttpParams({ fromObject: { number: number.toString(), available: available ? 'true' : 'false' } })
    const parkingSpacesObservable = this.http.put<ParkingSpace>(`${APIConfig.baseURL}parkingSpaces`, { params: params, headers: this.headers })
    parkingSpacesObservable.subscribe(res => {
      this.getParkingSpaces()
    })
    return parkingSpacesObservable
  }


}
