import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReviewdataService } from '../reviewdata.service';
import { ReviewService } from 'src/services/review.service';
import { NgxStarsComponent, NgxStarsModule } from 'ngx-stars';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, formatDate } from '@angular/common';
import { PlacedataService } from '../placedata.service';
import { PlaceService } from 'src/services/place.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-review-rating-popup',
  templateUrl: './review-rating-popup.component.html',
  styleUrls: ['./review-rating-popup.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxStarsModule,
    FormsModule,
    CommonModule
  ],
})
export class ReviewRatingPopupComponent {
  @Input() maxRating=5;
  maxRatingArr : any = [];

  @Input() SelectedStar = 0;

  previousSelection = 0;

  @ViewChild(NgxStarsComponent)
  starsComponent: NgxStarsComponent | undefined;

  @ViewChild('input')

  
  input!: ElementRef;

  reviewData: any;
  placeData: any;
  connectedUser: any;
  image: any;
  address: any;
  placeName: string = '';
  rating: number = 0; // Assuming rating is a number
  comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReviewRatingPopupComponent>, 
    private reviewDataService: ReviewdataService,
    private placeDataService: PlacedataService,
    private userService: UserService,
    private reviewService: ReviewService,
    private placeService: PlaceService
    ) { }

ngOnInit(): void {
  this.maxRatingArr = Array(this.maxRating).fill(0);
  this.connectedUser = this.userService.getConnectedUser();
  this.reviewDataService.reviewData$.subscribe((data: any) => {
    // Handle the data here
    this.reviewData = data;

  });
  if (this.reviewData != null) {
    this.placeName = this.reviewData.place.name;
    this.image = this.reviewData.place.images;
    this.address = this.reviewData.place.address;
    this.rating = this.reviewData.rate
    this.SelectedStar = this.rating;
    this.comment = this.reviewData.comment;
    this.starsComponent?.setRating(this.rating);
    console.log('Received review data in ReviewFormComponent:', this.reviewData);
  } else {
    this.placeDataService.placeData$.subscribe((data: any) => {
      // Handle the data here
      this.placeData = data;
      this.placeName = data.name;
      this.address = data.address;
      this.image = data.images;
      this.starsComponent?.setRating(this.rating);
      console.log('Received review data in ReviewFormComponent:', this.reviewData);
    });
  }
}

onRatingSet(rating: number): void {
  this.rating = rating + 1;
  this.SelectedStar = rating + 1;
  this.previousSelection = this.SelectedStar;
}

handleMouseEnter(index: any) {
  this.SelectedStar = index + 1;
}

handleMouseLeave() {
  if (this.previousSelection !== 0) {
    this.SelectedStar = this.previousSelection;
  } else {
    this.SelectedStar = 0;
  }
}


  submitRating(): void {
    // Handle the submitted onRatingSet 
    console.log(this.rating)
    if (this.reviewData != null) {
      this.reviewData.rate = this.rating;
      this.reviewData.comment = this.comment;
      console.log(this.reviewData);
      if (this.reviewData.id != '') {
        this.reviewService.updateReview(this.reviewData).subscribe(
          (response) => {
            console.log('Review updated successfully:', response);
            // Close the current dialog and open a new one
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error updating review:', error);
          }
        );
      }
      this.reviewService.registerReview(this.reviewData).subscribe(
        (response) => {
          console.log('Review registered successfully:', response);
          // Close the current dialog and open a new one
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error registering review:', error);
        }
      );
    } else {
      this.placeService.registerPlace(this.placeData).subscribe(
          (response) => {
            console.log('Place registered successfully:', response);
      
            // Now, make the next request inside this callback
            this.placeService.getPlaceByGoogleId(this.placeData?.id_place_google)
              .subscribe(
                (data: any) => {
                  // Handle the data here
                  this.placeData = data;
                  console.log(this.placeData);
      
                  // Only after getting placeData, proceed with creating reviewData
                  const reviewData = {
                    id: '',
                    rate: this.rating,
                    comment: this.comment,
                    date_publication: formatDate(new Date(), 'yyyy-MM-dd', 'fr'),
                    users: this.connectedUser,
                    place: this.placeData
                  };
      
                  console.log(reviewData);
      
                  // Now, make the final request
                  this.reviewService.registerReview(reviewData).subscribe(
                    (response) => {
                      console.log('Review registered successfully:', response);
                      // Close the current dialog and open a new one
                      this.reviewDataService.setReviewData(this.placeData);
                      this.dialogRef.close();
                    },
                    (error) => {
                      console.error('Error registering review:', error);
                    }
                  );
                },
                (error: any) => {
                  console.error('Error fetching place data:', error);
                }
              );
          },
          (error) => {
            console.error('Error registering place:', error);
          }
        );
    }
  }

}
