// Importation des modules Angular nécessaires
import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';

/* composant qui permet d'afficher les adresses de l'utilisateur. */

// Définition du composant avec le sélecteur 'app-my-adresses'
@Component({
  selector: 'app-my-adresses',
  templateUrl: './my-adresses.component.html',
  styleUrls: ['./my-adresses.component.scss']
})
// Définition de la classe du composant
export class MyAdressesComponent {

  // Propriété pour stocker les revues associées à l'utilisateur
  reviews: any;

  // Constructeur du composant, injecte les services nécessaires
  constructor(private reviewService: ReviewService, private userService: UserService) {
    // Appelle la méthode pour charger les revues lors de la création du composant
    this.loadReviews();
  }

  // Méthode pour charger les revues associées à l'utilisateur actuellement connecté
  loadReviews() {
    // Récupère l'utilisateur connecté à partir du stockage local
    const connectedUserString: string | null = localStorage.getItem('connectedUser');
    const connectedUser = connectedUserString ? JSON.parse(connectedUserString) : null;

    // Utilise le service de revues pour obtenir les revues associées à l'utilisateur
    this.reviewService.getReviewByUserId(connectedUser.id).subscribe(response => {
      // Stocke les revues dans la propriété du composant
      this.reviews = response;
      console.log(this.reviews); // Affiche les revues dans la console (à des fins de débogage)
    });
  }
}
