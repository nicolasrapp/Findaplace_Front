import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  Input,
  ElementRef,
  NgZone,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxGpAutocompleteDirective, NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';
import { MapService } from '../../services/map.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewRatingPopupComponent } from '../review-rating-popup/review-rating-popup.component';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { DatePipe, formatDate } from '@angular/common';
import { PlaceService } from 'src/services/place.service';
import { ReviewdataService } from '../reviewdata.service';
import { PlacedataService } from '../placedata.service';

export interface PlaceSearchResult {
  id?: null,
  id_place_google?: string,
  address?: string;
  location?: string;
  images?: string;
  icon?: string;
  name?: string;
}

/** @title Simple form field */
@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxGpAutocompleteModule
  ],
})
export class ReviewPopupComponent implements OnInit {
  @ViewChild('input')
  input!: ElementRef;

  @ViewChild('ngxPlaces')
  placesRef!: NgxGpAutocompleteDirective;

  @Input() placeholder = '';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  selectedPlace: PlaceSearchResult | undefined;

  placeData: any;

  connectedUser: any;

  constructor(public dialogRef: MatDialogRef<ReviewPopupComponent>,
    public dialog: MatDialog,
     private ngZone: NgZone, 
     private mapService: MapService,
     private reviewDataService: ReviewdataService,
     private placeDataService: PlacedataService,
     private reviewService: ReviewService,
     private placeService: PlaceService,
     private userService: UserService) {
    // const api = this.mapService.getGoogleMapsApi();
    // Access the bounds from the CarteComponent
    // const bounds = this.carteComponent.getBounds();
    // if (bounds) {
    //   console.log('Bounds from CarteComponent:', bounds.toJSON());
    //   // Now you can use these bounds for your other map or component
    // }
  }

  bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds(
    { lat: 48.815573, lng: 2.224199 }, // Southwest corner
    { lat: 48.902145, lng: 2.469920 } // Northeast corner
  );

  options = {
    types: ["restaurant"],
    bounds: this.bounds,
    componentRestrictions: { country: 'FR' },
  };


  ngOnInit() {
    this.connectedUser = this.userService.getConnectedUser();
    const mapBounds = this.mapService.mapBounds;
    if (mapBounds) {
      // Use the map bounds as needed
      this.bounds = mapBounds;
      this.options = {
        types: ["restaurant"],
        bounds: mapBounds,
        componentRestrictions: { country: 'FR' },
      };
      console.log(this.options.bounds)
      console.log('Map Bounds:', mapBounds.toJSON());
    } else {
      this.bounds = new google.maps.LatLngBounds(
        { lat: 48.815573, lng: 2.224199 }, // Southwest corner
        { lat: 48.902145, lng: 2.469920 } // Northeast corner
      );
    }

  }

  async ngAfterViewInit() {
  }

  onPlaceSelected(place: google.maps.places.PlaceResult) {
    // await this.getBoundsFromLocation();
    const formattedPlace: PlaceSearchResult = {
      id: null,
      id_place_google: place.place_id,
      address: this.input.nativeElement.value,
      name: place.name,
      location: place.geometry?.location?.toString(),
      images: this.getPhotoUrl(place),
      icon: place.icon,
    }
    this.selectedPlace = formattedPlace;
    console.log(this.selectedPlace);
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }

  nextStep(): void {
    console.log(this.connectedUser);

    this.placeService.getPlaceByGoogleId(this.selectedPlace?.id_place_google)
    .subscribe(
      (data: any) => {
        // Handle the data here
        this.placeData = data;
        console.log(this.placeData);

        if (this.placeData != null) {
          console.log("place already exists");
          this.reviewService.getReviewForPlaceAndUser(this.placeData.id, this.connectedUser.id).subscribe(
            (data: any) => {
              if (data != null) {
                console.log("review already exists");
                this.reviewDataService.setReviewData(data);
                this.dialogRef.close();
                this.dialog.open(ReviewRatingPopupComponent);
              } else {
                console.log("review doesn't exist");
                const reviewData = {
                  id: '',
                  rate: 0,
                  comment: "",
                  date_publication: formatDate(new Date(), 'yyyy-MM-dd', 'fr'),
                  users: this.connectedUser,
                  place: this.placeData
                };
  
                console.log(reviewData);
                this.reviewDataService.setReviewData(reviewData);
                this.dialogRef.close();
                this.dialog.open(ReviewRatingPopupComponent);
              }
            },
            (error: any) => {
              console.error('Error getting review for place and user:', error);
            }
          )
        } else {
          console.log("place doesn't exist");
          console.log("selected place", this.selectedPlace)
          this.placeDataService.setPlaceData(this.selectedPlace);
          this.dialogRef.close();
          this.dialog.open(ReviewRatingPopupComponent);
        }
      },
      (error: any) => {
        console.error('Error fetching place data:', error);
      }
    );
  }

}
