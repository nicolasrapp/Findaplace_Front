// review.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from 'src/config';

@Injectable({
  providedIn: 'root' // Service disponible au niveau racine de l'application
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  // Méthode pour enregistrer une nouvelle critique (review)
  registerReview(reviewData: any) {
    return this.http.post(`${APIURL}/review`, reviewData);
  }

  // Méthode pour mettre à jour une critique existante
  updateReview(reviewData: any) {
    return this.http.post(`${APIURL}/review/${reviewData.id}`, reviewData, { headers: { 'Content-Type': 'application/json' } });
  }

  // Méthode pour récupérer toutes les critiques
  getAllReviews() {
    return this.http.get(`${APIURL}/review`);
  }

  // Méthode pour récupérer les activités (reviews) d'un utilisateur
  getActivities(id: any) {
    return this.http.get(`${APIURL}/review/activities/${id}`);
  }

  // Méthode pour récupérer une critique par son ID
  getReviewById(id: any) {
    return this.http.get(`${APIURL}/review/${id}`);
  }

  // Méthode pour récupérer les critiques d'un utilisateur par son ID
  getReviewByUserId(id: any) {
    return this.http.get(`${APIURL}/review/user/${id}`);
  }

  // Méthode pour récupérer les critiques d'un lieu par son ID
  getReviewByPlaceId(id: any) {
    return this.http.get(`${APIURL}/review/place/${id}`);
  }

  // Méthode pour récupérer une critique spécifique associée à un lieu et un utilisateur
  getReviewForPlaceAndUser(place_id: any, user_id: any) {
    return this.http.get(`${APIURL}/review/place/${place_id}/user/${user_id}`);
  }
}
