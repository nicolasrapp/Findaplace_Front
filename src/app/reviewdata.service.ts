import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewdataService {
  private reviewDataSubject = new BehaviorSubject<any>(null);
  reviewData$ = this.reviewDataSubject.asObservable();

  setReviewData(data: any): void {
    this.reviewDataSubject.next(data);
  }
}
