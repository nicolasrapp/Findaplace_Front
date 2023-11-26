import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/config';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private connectedUser: any; // You can define a User type/interface
  userData: any; // Replace 'any' with your actual user type

  constructor(private http: HttpClient) {
    const connectedUserString : string | null = localStorage.getItem('connectedUser');
    this.connectedUser = connectedUserString ? JSON.parse(connectedUserString) : null;
  }

 /* setConnectedUser(user: any) {
    this.connectedUser = user;
  }*/

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
        var me = this.connectedUser;
        console.log(this.userData);
        return this.http.post(`${APIURL}/relation?follower=${me.id}&followed=${this.userData.id}`, null);
      })
    ).subscribe(
      (response) => {
        console.log('Friend added successfully:', response);
      },
      (error) => {
        console.error('Error adding friend:', error);
      }
    );
  }

  deleteFriend(friendid: any) {
    console.log(friendid);
  
    this.getUser(friendid).pipe(
      switchMap((user) => {
        this.userData = user;
        var me = this.connectedUser;
        console.log(this.userData);
        return this.http.delete(`${APIURL}/relation?follower=${me.id}&followed=${this.userData.id}`);
      })
    ).subscribe(
      (response) => {
       // this.cdr.detectChanges();
        console.log('Friend added successfully:', response);
      },
      (error) => {
        console.error('Error adding friend:', error);
      }
    ); 
    }

  getFollowers(id: any) {
    return this.http.get(`${APIURL}/user/followers/${id}`);
  }


  setConnectedUser(connectedUserString: string) {
    this.connectedUser = connectedUserString;
  }
 

  clearConnectedUser() {
    this.connectedUser = null;
  }

}
