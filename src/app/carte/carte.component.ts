import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ApplicationRef, Injector, EmbeddedViewRef, ComponentFactoryResolver } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { Loader } from '@googlemaps/js-api-loader';
import { mapstyle } from 'src/mapstyle';
import { PlaceService } from 'src/services/place.service';
import { PlacePopupComponent } from '../place-popup/place-popup.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';



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

  constructor(private router: Router, private loader: Loader, private placeservice: PlaceService, private sanitizer: DomSanitizer,
    private renderer2: Renderer2,  private elementRef: ElementRef) {}

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

        this.addMarker(latitude, longitude, place.name, place)

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

  addMarker(lati: any, long: any, title: any, place: any) {
    const newMarker = new google.maps.Marker({
      position: { lat: lati, lng: long },
      title: title,
      map: this.googleMap,
      icon: this.image,
    });
    
    const infoWindow = new google.maps.InfoWindow({
      content: this.CreatePopupContent(place),

    });

  newMarker.addListener('click', () => {
    infoWindow.open(this.googleMap, newMarker);
  });
    google.maps.event.addListener(infoWindow, 'domready', () => {
      const voirPlusButton = document.getElementById('voirplusbutton');
      if (voirPlusButton) {
        voirPlusButton.addEventListener('click', () => {
          console.log('Redirecting to place');
          this.router.navigate([`/place`, place.id]);
        });
      }
    });
    console.log(newMarker);
    this.markers.push(newMarker);
  }


CreatePopupContent(place: any){
  const contentpopup = `
  <style>
  .infowindow-content {
      font-family: Arial, sans-serif;
      max-width: 300px;
  }

  .place-name h1 {
      color: black;
      font-weight: 700;
      font-size: 16px;
      margin: 0;
  }

  .address p {
      color: black;
      font-weight: 400;
      font-size: 12px;
      margin: 0;
      margin-top: 5px;
  }

  .tag p {
      margin-top: 10px;
      background-color: #FFC480;
      padding: 4px 12px;
      border-radius: 50px;
      color: white;
      font-size: 12px;
      font-weight: 300;
      width: 60px;
  }

  .rating-line {
      margin-top: 10px;
  }

  .people .icon,
  .people .icon-plus {
      background-color: #FF9797;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
  }

  .people .icon-plus {
      background-color: white;
      border: 1px solid black;
      color: black;
  }

  .rating p {
      color: black;
      margin: 0;
      font-size: 14px;
      font-weight: 400;
  }

  .photos {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
  }

  .photo,
  .photos-plus {
      width: 100%;
      height: 150px;
      margin-right: 5px;
      margin-bottom: 5px;
      overflow: hidden;
      border-radius: 8px;
  }

  .photo img,
  .photos-plus img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }

  .voir-plus-button {
    margin-top: 5px;
    text-align: center;
  }

  .voir-plus-button button {
    background-color: #FFEAB2; /* Green background color */
    color: black;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }
  .voir-plus-button button:hover {
    color: white;
    background-color: #FFC480; /* Darker green on hover */
  }

  
</style>

<div class="infowindow-content">
  <div class="place-name">
      <h1>${place.name}</h1>
  </div>
  <div class="address">
      <p>${place.address}</p>
  </div>
  <div class="tag">
      <p>Italian</p>
  </div>
  
  <div class="photos">
      <div class="photo">
          <img src=${place.images}>
      </div>
      
  </div>
  <div class="voir-plus-button">
  <button id="voirplusbutton" >Voir Plus</button>
  </div>
</div>`

return contentpopup
}

}


