import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';

import { PlaceSearchResult, ReviewPopupComponent } from './review-popup/review-popup.component';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  openReview() {
  }
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    
  }

}
