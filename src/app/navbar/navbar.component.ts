import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  connectedUser: any; // You can define a User type/interface

  constructor(private userService: UserService) {}


  onSubmit() {
    localStorage.removeItem('connectedUser'); // Remove user data from local storage
  this.userService.clearConnectedUser(); // Clear user data from the service
  // Additional logout logic
  }

  ngOnInit() {
    this.connectedUser = this.userService.getConnectedUser();
  }
}
