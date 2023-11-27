// placedata.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Service disponible au niveau racine de l'application
})
export class PlacedataService {
  // BehaviorSubject pour stocker les données du lieu et permettre l'observation
  private placeDataSubject = new BehaviorSubject<any>(null);
  
  // Observable exposant les données du lieu
  placeData$ = this.placeDataSubject.asObservable();

  // Méthode pour mettre à jour les données du lieu
  setPlaceData(data: any): void {
    // Émet les nouvelles données du lieu à tous les observateurs
    this.placeDataSubject.next(data);
  }
}
