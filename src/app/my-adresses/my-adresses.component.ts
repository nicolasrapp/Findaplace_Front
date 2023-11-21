import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-my-adresses',
  templateUrl: './my-adresses.component.html',
  styleUrls: ['./my-adresses.component.scss']
})
export class MyAdressesComponent {

  reviews: any;

  constructor(private reviewService: ReviewService) {
    this.loadReviews();
   }

  ngOnInit() {
    
  }

  loadReviews() {
    this.reviewService.getAllReview().subscribe(response => {
      this.reviews = response;
      console.log(this.reviews);
    });
   
  }
/*
  private reviews2 = this.reviewService.getAllReview().subscribe(
    (data) => {
      this.monObjet = data;
      console.log('Données récupérées avec succès :', this.monObjet);
    },
    (error) => {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
    }
  );*/

}
