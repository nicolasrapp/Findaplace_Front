import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacedataService {
  private placeDataSubject = new BehaviorSubject<any>(null);
  placeData$ = this.placeDataSubject.asObservable();

  setPlaceData(data: any): void {
    this.placeDataSubject.next(data);
  }
}
