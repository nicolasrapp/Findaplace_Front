import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  AfterViewInit,
  Input,
  ElementRef,
  NgZone,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NgxGpAutocompleteDirective, NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CarteComponent } from '../carte/carte.component';

export interface PlaceSearchResult {
  place_id?: string,
  address?: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
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


  // carteComponent: CarteComponent | undefined;

  constructor( private ngZone: NgZone) {
    // Access the bounds from the CarteComponent
    // const bounds = this.carteComponent.getBounds();
    // if (bounds) {
    //   console.log('Bounds from CarteComponent:', bounds.toJSON());
    //   // Now you can use these bounds for your other map or component
    // }
  }

  // findLocation() {
  //   pos: google.maps.LatLngBounds;
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: GeolocationPosition) => {
  //         pos = new google.maps.LatLng.getCenter( {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       }
  //     );
  //   }
  // }
  parisBounds: google.maps.LatLngBounds = new google.maps.LatLngBounds(
    { lat: 48.815573, lng: 2.224199 }, // Southwest corner
    { lat: 48.902145, lng: 2.469920 } // Northeast corner
  );

  actualBounds: google.maps.LatLngBounds = new google.maps.LatLngBounds

  options = {
    types: ["restaurant"],
    // origin: {
    //   lat: 48.864716,
    //   lng: 2.349014
    // },
    // bounds: this.carteComponent.getBounds(),
    bounds: this.parisBounds,
    componentRestrictions: { country: 'FR' },
  };

  ngOnInit() {
    // Use the Loader service to load data or perform actions
    
  }

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.input.nativeElement
    );
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      console.log("in function");
      const result: PlaceSearchResult = {
        place_id: place?.place_id,
        address: this.input.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
        imageUrl: this.getPhotoUrl(place),
        iconUrl: place?.icon,
      };
      this.ngZone.run(() => {
        console.log("here", result);
        this.placeChanged.emit(result);
      }
      );

    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }

  // onAddressComponentsChange(address: any) {
  //   console.log('Address Components:', address);
  // }
}
