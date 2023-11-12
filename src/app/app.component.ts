import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';

import { PlaceSearchResult, ReviewPopupComponent } from './review-popup/review-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  fromValue: PlaceSearchResult | undefined;

  getPlace(placeChanged : PlaceSearchResult) {
    this.fromValue = placeChanged;
  }
  
  openReview() {
  }
  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit() {
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
