import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Import the user service
import { MatDialog } from '@angular/material/dialog';
import { ReviewPopupComponent } from '../review-popup/review-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  connectedUser: any; // You can define a User type/interface

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit() {
    this.connectedUser = this.userService.getConnectedUser();
    const userDataString = localStorage.getItem('connectedUser');
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      this.userService.setConnectedUser(userData);
    }
  }
  
  
  openDialog(): void { 
    let dialogRef = this.dialog.open(ReviewPopupComponent, { 
      width: '250px', 
      data: "right click"
    }); 
  
    // dialogRef.afterClosed().subscribe(result => { 
    //   this.animal = result; 
    // }); 
  } 
}
