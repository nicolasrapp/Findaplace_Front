import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/services/place.service';
import { ReviewService } from 'src/services/review.service';


@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})

export class PlaceComponent implements OnInit  {
  place: any;

  placeId: string = '';

  reviews: any;

  constructor(private route: ActivatedRoute, private placeservice: PlaceService, private reviewservice: ReviewService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.placeId = params['id'];

      console.log('Place id:', this.placeId);

      this.placeservice.getPlaceById(this.placeId).subscribe((data: any) => {
        this.place = data
        console.log(this.place)
      })
    });

    this.reviewservice.getReviewByPlaceId(this.placeId).subscribe((data: any) =>{
      this.reviews = data
      console.log(this.reviews)
    })

  }
}
