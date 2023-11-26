import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/services/place.service';
import { ReviewService } from 'src/services/review.service';
import { ShowreviewComponent } from '../showreview/showreview.component';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})

export class PlaceComponent implements OnInit  {
  place: any;

  placeId: string = '';

  reviews: any;

  constructor(private route: ActivatedRoute, private placeservice: PlaceService, private reviewservice: ReviewService, private userservice: UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.placeId = params['id'];

      this.placeservice.getPlaceById(this.placeId).subscribe((data: any) => {
        this.place = data
      })
    });

    this.reviewservice.getReviewByPlaceId(this.placeId).subscribe((data: any) =>{
      this.reviews = data
      console.log(this.reviews)

      this.reviews.forEach((review: any) => {
        this.userservice.getUser(review.users_id).subscribe((userData: any) => {
          review.users_id = userData.user_name;
        });
        console.log(this.reviews)
      });
    })

  }
}
