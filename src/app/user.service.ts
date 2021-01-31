import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import APIConfig from './api.config.js'

export interface User {
  _id?: string,
  name: string,
  phone: string,
  cars?: Array<string>,
}

export interface HttpHandler {
  status?: string
  msg?: string
  id?: number
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = new Array<User>()
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) {
  }

  getUser(id: string) {
    const usersObservable = this.http.get<User[]>(`${APIConfig.baseURL}users/${id}`, { headers: this.headers },)
    usersObservable.subscribe(res => {
      this.users = res
    })
    return usersObservable
  }

  getAllUsers() {
    const usersObservable = this.http.get<User[]>(`${APIConfig.baseURL}users`)
    usersObservable.subscribe(res => {
      this.users = res
    })
    return usersObservable
  }

  postUser(user: User) {
    console.log('postUser: ', user)
    const params = new HttpParams({ fromObject: { name: user.name, phone: user.phone } })
    const result = this.http.post<{user: User, httpHandler: HttpHandler}>(`${APIConfig.baseURL}users`, params)
    result.subscribe((res) => {
      this.getAllUsers()
    })
    return result
  }

  editUser(user: User) {
    console.log('Edit User: ', user)
    const params = new HttpParams({ fromObject: { name: user.name, phone: user.phone, cars: user.cars } })
    const result = this.http.put<User>(`${APIConfig.baseURL}users/${user._id}`, params)
    result.subscribe((res) => {
      console.log('User edited: ', res)
      this.getAllUsers()
    })
    return result
  }

  deleteUser(id: string) {
    return this.http.delete<HttpHandler>(`${APIConfig.baseURL}users/${id}`,)
  }
}
