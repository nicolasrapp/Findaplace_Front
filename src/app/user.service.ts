import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/config';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private connectedUser: any; // You can define a User type/interface
  userData: any; // Replace 'any' with your actual user type

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
  
  getUser(id: any) {
    return this.http.get(`${APIURL}/user/${id}`)
    
  }


  addFriend(friendid: any) {
    console.log(friendid);
  
    this.getUser(friendid).pipe(
      switchMap((user) => {
        this.userData = user;
        var me = this.getConnectedUser();
        console.log(this.userData);
        return this.http.post(`${APIURL}/relation?follower=${me.id}&followed=${this.userData.id}`, null);
      })
    ).subscribe(
      (response) => {
        console.log('Friend added successfully:', response);
        // Handle the successful response
      },
      (error) => {
        console.error('Error adding friend:', error);
        // Handle errors
      }
    );
  }

  getFollowers(id: any) {
    return this.http.get(`${APIURL}/user/followers/${id}`);
  }

 

  clearConnectedUser() {
    this.connectedUser = null;
  }
}
