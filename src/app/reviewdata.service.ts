// reviewdata.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Service disponible au niveau racine de l'application
})
export class ReviewdataService {
  // BehaviorSubject pour stocker les données de la critique et permettre l'observation
  private reviewDataSubject = new BehaviorSubject<any>(null);
  
  // Observable exposant les données de la critique
  reviewData$ = this.reviewDataSubject.asObservable();

  // Méthode pour mettre à jour les données de la critique
  setReviewData(data: any): void {
    // Émet les nouvelles données de la critique à tous les observateurs
    this.reviewDataSubject.next(data);
  }
}
