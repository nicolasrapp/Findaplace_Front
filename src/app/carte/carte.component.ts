import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { Loader } from '@googlemaps/js-api-loader';
import { mapstyle } from 'src/mapstyle';
import { PlaceService } from 'src/services/place.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']  
})
export class CarteComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMapElement', { static: false }) googleMapElement!: GoogleMap;

  Allplaces: any[] = [];

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 48.864716,
    lng: 2.349014
  };
  zoom = 13;
  markers: google.maps.Marker[] = [];
  googleMap: google.maps.Map | undefined;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    styles: mapstyle
  };

  constructor(private loader: Loader, private placeservice: PlaceService) {}

  getBounds(): google.maps.LatLngBounds | undefined {
    if (this.googleMap) {
      return this.googleMap.getBounds() || undefined;
    }
    return undefined;
  }

  moveToLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

         
          this.center = pos;
        },
        () => {
          this.handleLocationError(true, this.infoWindow, this.center);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.center);
    }
  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLngLiteral
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    console.log("Location: ", pos);
    infoWindow.open(this.googleMap);
  }

  infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
  ngOnInit() {

    this.placeservice.getAllPlaces().subscribe((data: any) =>{

      this.Allplaces = data;
      console.log(this.Allplaces)
      this.Allplaces.forEach(place => {
        // Extract latitude and longitude from the location string
        const [latitudeStr, longitudeStr] = place.location
          .replace('(', '')
          .replace(')', '')
          .split(', ');

        // Parse the strings into numbers
        const latitude = parseFloat(latitudeStr);
        const longitude = parseFloat(longitudeStr);

        this.addMarker(latitude, longitude, place.name)

  })
})
}

  ngAfterViewInit(): void {
    // Now, the Google Map should be initialized.
    const map = this.googleMapElement.googleMap;
    if (map) {
      this.googleMap = map;
    }
  }

  image = {
    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
  };

  addMarker(lati: any, long: any, title: any) {
    const newMarker = new google.maps.Marker({
      position: { lat: lati, lng: long },
      title: title,
      map: this.googleMap,
      icon: this.image,
    });

    // Log the new marker
    console.log(newMarker);

    // Add the marker to the markers array
    this.markers.push(newMarker);
  }



}
