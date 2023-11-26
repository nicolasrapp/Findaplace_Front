import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Import the user service
import { MatDialog } from '@angular/material/dialog';
import { PlaceSearchResult, ReviewPopupComponent } from '../review-popup/review-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  connectedUser: any;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.connectedUser = this.userService.getConnectedUser();
  }
  
}
