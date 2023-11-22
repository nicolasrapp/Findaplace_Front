import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }


  registerPlace(placeData: any) {
    return this.http.post(`${APIURL}/place`, placeData);
  }

  updatePlace(placeData: any) {
    return this.http.post(`${APIURL}/place/${placeData.id}`, placeData, { headers: { 'Content-Type': 'application/json' } });
  }

  getAllPlaces() {
    return this.http.get(`${APIURL}/place`);
  }

  getPlaceById(id: any) {
    return this.http.get(`${APIURL}/place/${id}`);
  }

  getPlaceByGoogleId(id: any) {
    return this.http.get(`${APIURL}/place/google/${id}`);
  }
}
