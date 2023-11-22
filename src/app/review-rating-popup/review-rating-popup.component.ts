import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReviewdataService } from '../reviewdata.service';
import { ReviewService } from 'src/services/review.service';
import { NgxStarsComponent, NgxStarsModule } from 'ngx-stars';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-review-rating-popup',
  templateUrl: './review-rating-popup.component.html',
  styleUrls: ['./review-rating-popup.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxStarsModule,
    FormsModule
  ],
})
export class ReviewRatingPopupComponent {
  @ViewChild(NgxStarsComponent)
  starsComponent: NgxStarsComponent | undefined;

  @ViewChild('input')
  input!: ElementRef;

  reviewData: any;
  placeName: string = '';
  rating: number = 0; // Assuming rating is a number
  comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReviewRatingPopupComponent>, 
    private reviewDataService: ReviewdataService,
    private reviewService: ReviewService
    ) { }

ngOnInit(): void {
  this.reviewDataService.reviewData$.subscribe((data: any) => {
    // Handle the data here
    this.reviewData = data;
    this.placeName = this.reviewData.name;
    this.rating = this.reviewData.rate
    this.starsComponent?.setRating(this.rating);
    console.log('Received review data in ReviewFormComponent:', this.reviewData);
  });
}

onRatingSet(rating: number): void {
  this.rating = rating;
}

  submitRating(): void {
    // Handle the submitted rating
    this.reviewData.rate = this.rating;
    this.reviewData.comment = this.comment;
    this.reviewService.updateReview(this.reviewData).subscribe(
      (response) => {
        console.log('Review registered successfully:', response);
        // Close the current dialog and open a new one
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error registering review:', error);
      }
    );
  }

}
