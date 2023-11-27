// Importation des modules Angular nécessaires
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/services/place.service';
import { ReviewService } from 'src/services/review.service';
import { ShowreviewComponent } from '../showreview/showreview.component';
import { UserService } from 'src/services/user.service';

/* composant qui permet d'afficher un spot ainsi que toutes les critiques qui lui sont associées. */

// Définition du composant avec le sélecteur 'app-place'
@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})

// Définition de la classe du composant
export class PlaceComponent implements OnInit  {
  // Propriété pour stocker les détails du lieu
  place: any;

  // Propriété pour stocker l'identifiant du lieu
  placeId: string = '';

  // Propriété pour stocker les critiques associées au lieu
  reviews: any;

  // Constructeur du composant, injecte les services nécessaires et ActivatedRoute pour obtenir les paramètres de l'URL
  constructor(private route: ActivatedRoute, private placeservice: PlaceService, private reviewservice: ReviewService, private userservice: UserService) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Souscrit aux changements des paramètres d'URL (notamment l'identifiant du lieu)
    this.route.params.subscribe(params => {
      // Récupère l'identifiant du lieu à partir des paramètres de l'URL
      this.placeId = params['id'];

      // Utilise le service de lieu pour obtenir les détails du lieu en fonction de l'identifiant
      this.placeservice.getPlaceById(this.placeId).subscribe((data: any) => {
        // Stocke les détails du lieu dans la propriété du composant
        this.place = data;
      });
    });

    // Utilise le service de critiques pour obtenir les critiques associées au lieu en fonction de l'identifiant du lieu
    this.reviewservice.getReviewByPlaceId(this.placeId).subscribe((data: any) =>{
      // Stocke les critiques dans la propriété du composant
      this.reviews = data;
      console.log(this.reviews);

      // Parcourt chaque critique pour obtenir les détails de l'utilisateur associé à cette critique
      this.reviews.forEach((review: any) => {
        // Utilise le service utilisateur pour obtenir les détails de l'utilisateur en fonction de l'identifiant utilisateur dans la critique
        this.userservice.getUser(review.users_id).subscribe((userData: any) => {
          // Met à jour l'identifiant utilisateur dans la critique avec le nom d'utilisateur correspondant
          review.users_id = userData.user_name;
        });
        console.log(this.reviews);
      });
    });
  }
}
