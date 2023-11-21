import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.scss']
})
export class MyReviewComponent {
  @Input() review: any;
  ngOnInit() {
    console.log(this.review)
  }
 
}

