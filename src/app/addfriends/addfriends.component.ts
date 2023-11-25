import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FilterUsersPipe } from '../filterusers.pipe';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addfriends',
  templateUrl: './addfriends.component.html',
  styleUrls: ['./addfriends.component.scss']
})
export class AddfriendsComponent implements OnInit {
  searchQuery: any;
  users: any[] = [];
  connectedUser: any; // You can define a User type/interface
  followersList: any[] = []; // Assuming this is the type of your followers objects



  constructor(private userService: UserService, private router: Router,) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
      this.connectedUser = this.userService.getConnectedUser();
  
      // Ensure that this.connectedUser is defined before using it
      if (this.connectedUser) {
        this.users = this.users.filter(user => user.id !== this.connectedUser.id);
  
        // Subscribe to the observable to get the followers data
        this.userService.getFollowers(this.connectedUser.id).subscribe((followers: any) => {
          console.log(followers);
  
          // Now you can use the followers data as a list of objects
          // For example, you can assign it to a class variable
          this.followersList = followers;
        });
      }
    });
  }
  
  isUserFollowing(user: any): boolean {
    return this.followersList && this.followersList.some(follower => follower.id === user.id);
  }

  FollowUser(user: any){
    const userId = user.id
    this.userService.addFriend(userId)
    console.log("here")
  }
}
