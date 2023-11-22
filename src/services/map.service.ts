import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private googleMapsApi: any;

  // initializeApi(apiKey: string) {
  //   this.loader = new Loader({ apiKey, libraries: ['places'] })
  //   return this.googleMapsApi = google.maps;
  // }

  setGoogleMapsApi(loader: Loader) {
    this.googleMapsApi = loader;
  }

  getGoogleMapsApi(): any {
    return this.googleMapsApi;
  }
  mapBounds: google.maps.LatLngBounds | undefined;
}
