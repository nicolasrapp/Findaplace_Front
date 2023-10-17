import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Import the user service

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  connectedUser: any; // You can define a User type/interface

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.connectedUser = this.userService.getConnectedUser();
  }
}
