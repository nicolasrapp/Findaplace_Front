// Importation du module Input de Angular Core
import { Component, Input } from '@angular/core';

/* composant qui permet d'afficher un avis sur un spot. */

// Définition du composant avec le sélecteur 'app-my-review'
@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.scss']
})
// Définition de la classe du composant
export class MyReviewComponent {
  // Propriété d'entrée pour la revue à afficher
  @Input() review: any;

  // Propriété d'entrée pour les détails de l'utilisateur associé à la revue
  @Input() user: any;

  // Propriété d'entrée pour stocker l'adresse (initialisée à une chaîne vide par défaut)
  @Input() address: string = "";

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Affiche la revue dans la console (à des fins de débogage)
    console.log(this.review);
    
    // Appelle la méthode pour récupérer les détails de l'adresse à partir de l'ID du lieu Google
    this.getDetailsFromId(this.review.place.id_place_google);
  }

  // Méthode pour obtenir les détails de l'adresse à partir de l'ID du lieu Google
  getDetailsFromId(placeId: string): any {
    // Crée une instance du géocodeur de Google Maps
    const geocoder = new google.maps.Geocoder();

    // Utilise le géocodeur pour obtenir les détails de l'adresse à partir de l'ID du lieu Google
    geocoder.geocode({ placeId: placeId }, (results: any, status: any) => {
      // Vérifie si la requête a réussi
      if (status === 'OK') {
        // Affiche l'adresse dans la console (à des fins de débogage)
        console.log("adresse : ", results[0].formatted_address);
        
        // Stocke l'adresse dans la propriété du composant
        this.address = results[0].formatted_address;
      } else {
        // Affiche un message d'erreur en cas d'échec de la requête d'adresse
        console.log("erreur requête adresse");
      }
    });
  }
}
