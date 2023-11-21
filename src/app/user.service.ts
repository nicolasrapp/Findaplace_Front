import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private connectedUser: any; // You can define a User type/interface

  constructor(private http: HttpClient) { }

  setConnectedUser(user: any) {
    this.connectedUser = user;
  }

  getConnectedUser() {
    return this.connectedUser;
  }

  registerUser(userData: any) {
    return this.http.post(`${APIURL}/user`, userData);
  }

  getAllUsers() {
    return this.http.get(`${APIURL}/user`);
  }

  clearConnectedUser() {
    this.connectedUser = null;
  }

}
