import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FilterUsersPipe } from '../filterusers.pipe';

@Component({
  selector: 'app-addfriends',
  templateUrl: './addfriends.component.html',
  styleUrls: ['./addfriends.component.scss']
})
export class AddfriendsComponent implements OnInit {
  searchQuery: any;
  users: any[] = [];
  connectedUser: any; // You can define a User type/interface


  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
      this.connectedUser = this.userService.getConnectedUser();
      this.users = this.users.filter(user => user.id !== this.connectedUser.id); // Adjust the property (e.g., 'id') used for comparison

    });
  }
}
