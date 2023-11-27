// Importation des modules Angular nécessaires
import { Component } from '@angular/core';
import { ReviewService } from 'src/services/review.service';
import { UserService } from 'src/services/user.service';

/* composant qui permet d'afficher les activités les plus récentes de vos amis. */

// Définition du composant avec le sélecteur 'app-recent-activity'
@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})
// Définition de la classe du composant
export class RecentActivityComponent {

  // Propriété pour stocker toutes les critiques récupérées du service
  allReviews: any;

  // Propriété pour stocker les dernières 4 critiques pour affichage
  reviews: any;

  // Constructeur du composant, injecte les services nécessaires pour obtenir les données des critiques et des utilisateurs
  constructor(private reviewService: ReviewService, private userService : UserService) {
    // Appelle la méthode pour charger les critiques récentes lors de l'initialisation du composant
    this.loadReviews();
  }

  // Méthode pour charger les critiques récentes
  loadReviews() {
    // Récupère les informations de l'utilisateur connecté à partir du stockage local
    const connectedUserString : string | null = localStorage.getItem('connectedUser');
    const connectedUser = connectedUserString ? JSON.parse(connectedUserString) : null;

    // Utilise le service de critiques pour obtenir les activités de l'utilisateur connecté
    this.reviewService.getActivities(connectedUser.id).subscribe((response: any | Object) => {
      // Récupère la date actuelle
      const currentDate = new Date();

      // Filtre les critiques en fonction du critère de date (au cours des 2 dernières semaines)
      this.allReviews = response.filter((review: any) => {
        const reviewDate = new Date(review.date_publication);
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(currentDate.getDate() - 14); // Soustrait 14 jours

        return reviewDate >= twoWeeksAgo && reviewDate <= currentDate;
      });

      console.log(this.allReviews);

      // Trie les critiques par date dans l'ordre décroissant
      this.allReviews.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Prend uniquement les 4 dernières critiques
      this.reviews = this.allReviews.slice(this.allReviews.length - 4, this.allReviews.length);

      console.log(this.reviews);
    });
  }
}
