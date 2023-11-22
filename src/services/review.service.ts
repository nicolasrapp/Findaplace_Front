import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  registerReview(reviewData: any) {
    return this.http.post(`${APIURL}/review`, reviewData);
  }

  updateReview(reviewData: any) {
    return this.http.post(`${APIURL}/review/${reviewData.id}`, reviewData, { headers: { 'Content-Type': 'application/json' } });
  }

  getAllReviews() {
    return this.http.get(`${APIURL}/review`);
  }

  getReviewById(id: any) {
    return this.http.get(`${APIURL}/review/${id}`);
  }

  getReviewByUserId(id: any) {
    return this.http.get(`${APIURL}/review/user/${id}`);
  }

  getReviewByPlaceId(id: any) {
    return this.http.get(`${APIURL}/review/place/${id}`);
  }
}
