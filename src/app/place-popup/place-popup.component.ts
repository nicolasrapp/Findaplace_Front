import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-place-popup',
  templateUrl: './place-popup.component.html',
  styleUrls: ['./place-popup.component.scss']
})
export class PlacePopupComponent {
  @Input() review: any;
  stars = Array(5).fill(0);
  ngOnInit() {
    console.log(this.review)
  }
}
