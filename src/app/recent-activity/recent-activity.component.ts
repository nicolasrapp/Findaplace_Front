import { Component } from '@angular/core';
import { ReviewService } from 'src/services/review.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})
export class RecentActivityComponent {

  allReviews: any;
  reviews: any;

  constructor(private reviewService: ReviewService, private userService : UserService) {
    this.loadReviews();
   }

  loadReviews() {
    const connectedUserString : string | null = localStorage.getItem('connectedUser');
    const connectedUser = connectedUserString ? JSON.parse(connectedUserString) : null;
    this.reviewService.getActivities(connectedUser.id).subscribe((response: any | Object) => {
      const currentDate = new Date();
  
      // Filter reviews based on the date criteria (within the last 2 weeks)
      this.allReviews = response.filter((review: any) => {
        const reviewDate = new Date(review.date_publication);
        console.log("review date", review.date)
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(currentDate.getDate() - 14); // Subtract 14 days
  
        return reviewDate >= twoWeeksAgo && reviewDate <= currentDate;
      });
  
      console.log(this.allReviews)
      // Sort the reviews by date in descending order
      this.allReviews.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
      // Take only the last 4 reviews
      this.reviews = this.allReviews.slice(this.allReviews.length - 4, this.allReviews.length);
  
      console.log(this.reviews);
    });



  }

}
