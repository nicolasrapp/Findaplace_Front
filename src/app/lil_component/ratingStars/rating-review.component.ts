// restaurant-rating.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-review',
  template: `
    <div class="stars">
      <app-star *ngFor="let star of stars" [isFilled]="star"></app-star>
    </div>
  `,
  styles: [/* Vos styles CSS ici */]
})
export class RatingReview {
  @Input() rating: number = 0;

  get stars(): boolean[] {
    const numStars : number = 5;
    let stars: boolean[] = [];
    for(let i = 0; i < numStars; i++){
      stars[i] = (i<this.rating) ? true : false;
    }
    return stars;
  }
}
