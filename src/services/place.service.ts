// place.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from 'src/config';

@Injectable({
  providedIn: 'root' // Service disponible au niveau racine de l'application
})
export class PlaceService {
  constructor(private http: HttpClient) { }

  // Méthode pour enregistrer une nouvelle place
  registerPlace(placeData: any) {
    return this.http.post(`${APIURL}/place`, placeData);
  }

  // Méthode pour mettre à jour une place existante
  updatePlace(placeData: any) {
    return this.http.post(`${APIURL}/place/${placeData.id}`, placeData, { headers: { 'Content-Type': 'application/json' } });
  }

  // Méthode pour récupérer toutes les places
  getAllPlaces() {
    return this.http.get(`${APIURL}/place`);
  }

  // Méthode pour récupérer une place par son ID
  getPlaceById(id: any) {
    return this.http.get(`${APIURL}/place/${id}`);
  }

  // Méthode pour récupérer une place par son ID Google
  getPlaceByGoogleId(id: any) {
    return this.http.get(`${APIURL}/place/google/${id}`);
  }
}
