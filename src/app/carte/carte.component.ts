import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { Loader } from '@googlemaps/js-api-loader';
import { mapstyle } from 'src/mapstyle';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']  ,
})
export class CarteComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMapElement', { static: false }) googleMapElement!: GoogleMap;

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 48.864716,
    lng: 2.349014
  };
  zoom = 13;
  markers: google.maps.Marker[] = [];
  googleMap: google.maps.Map | undefined;

  autoCenterMap = true;
  loadingMap = true;

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

  constructor(private mapService: MapService) {
    this.center = {
      lat: 48.864716,
      lng: 2.349014
    };
  }

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

          if (this.googleMap) {
            if (this.autoCenterMap) {
              this.googleMap.setCenter(pos);
              this.googleMap.setZoom(13);
              this.autoCenterMap = false;
            } else {
              // Optionally, pan to the user's location smoothly without changing zoom
              this.googleMap.panTo(pos);
              this.googleMap.setZoom(14);
            }
            this.mapService.mapBounds = this.googleMap.getBounds();
          }
          this.loadingMap = false; // Set loading to false when the map is ready
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Handle geolocation error more gracefully, e.g., display a user-friendly message
          this.loadingMap = false;
        },
        { maximumAge: 60000, timeout: 5000, enableHighAccuracy: false }
      );
    } else {
      // Browser doesn't support Geolocation
      console.error("Browser doesn't support geolocation.");
      this.loadingMap = false;
    }
  }

  ngOnInit() {
    // this.moveToLocation();
  }

  ngAfterViewInit(): void {
    // Now, the Google Map should be initialized.
    const map = this.googleMapElement.googleMap;
    if (map) {
      this.googleMap = map;
      this.googleMap.addListener('tilesloaded', () => {
        if (this.autoCenterMap) {
          this.moveToLocation();

          console.log("autocenter:", this.autoCenterMap)
          // Allow free map movement after initial centering
          // this.autoCenterMap = false;

          // // Remove the event listener to avoid unnecessary re-centering
          // google.maps.event.removeListener(tilesLoadedListener);
        }
      });
      // this.mapService.setGoogleMapsApi(this.loader);
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

  addMarker() {
    // Create a marker using the input data (address and restaurant name)
    const newMarker = new google.maps.Marker({
      position: { lat: this.center.lat, lng: this.center.lng },
      title: "title",
      map: this.googleMap,
      icon: this.image,
    });

    // Log the new marker
    console.log(newMarker);

    // Add the marker to the markers array
    this.markers.push(newMarker);
  }
}
