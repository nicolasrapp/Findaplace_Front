// map.service.ts
import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root' // Service disponible au niveau racine de l'application
})
export class MapService {
  private googleMapsApi: any; // Référence à l'API Google Maps
  mapBounds: google.maps.LatLngBounds | undefined; // Limites de la carte, initialisées à undefined

  // Méthode pour définir l'API Google Maps à l'aide du chargeur (Loader)
  setGoogleMapsApi(loader: Loader): void {
    this.googleMapsApi = loader;
  }

  // Méthode pour obtenir l'API Google Maps
  getGoogleMapsApi(): any {
    return this.googleMapsApi;
  }
}
