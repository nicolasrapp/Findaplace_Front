import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { UserService} from '../../services/user.service'

@Component({
  selector: 'app-my-adresses',
  templateUrl: './my-adresses.component.html',
  styleUrls: ['./my-adresses.component.scss']
})
export class MyAdressesComponent {

  reviews: any;

  constructor(private reviewService: ReviewService, private userService : UserService) {
    this.loadReviews();
   }

  loadReviews() {
    const connectedUserString : string | null = localStorage.getItem('connectedUser');
    const connectedUser = connectedUserString ? JSON.parse(connectedUserString) : null;
    this.reviewService.getReviewByUserId(connectedUser.id).subscribe(response => {
      this.reviews = response;
      console.log(this.reviews);
    });
   
  }

}
