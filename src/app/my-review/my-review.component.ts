import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.scss']
})
export class MyReviewComponent {
  @Input() review: any;
  @Input() adress: string ="";

  ngOnInit() {
    console.log(this.review)
    this.getDetailsFromId(this.review.place.id_place_google)
  }

  getDetailsFromId(placeId: string): any {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId: placeId }, (results: any, status: any) => {
      if (status === 'OK') {
        console.log("adress : ",results[0].formatted_address)
        this.adress = results[0].formatted_address;
      } else {
        console.log("erreur requete adress");
      }
    });
  }
}

