import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    const userDataString = localStorage.getItem('connectedUser');
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      this.userService.setConnectedUser(userData);
    }
  }
  
}
