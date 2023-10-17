import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private connectedUser: any; // You can define a User type/interface

  setConnectedUser(user: any) {
    this.connectedUser = user;
  }

  getConnectedUser() {
    return this.connectedUser;
  }

  clearConnectedUser() {
    this.connectedUser = null;
  }
}
