// restaurant-rating.component.ts

/* composant qui gere l'affichage des etoiles pour les notes des spots. */

// Importation du décorateur Component et de l'input de Angular Core
import { Component, Input } from '@angular/core';

// Définition du composant avec le sélecteur 'app-rating-review'
@Component({
  selector: 'app-rating-review',
  template: `
    <!-- Affichage des étoiles en utilisant le composant 'app-star' pour chaque étoile -->
    <div class="stars">
      <app-star *ngFor="let star of stars" [isFilled]="star"></app-star>
    </div>
  `,
  styles: []
})
// Définition de la classe du composant
export class RatingReview {
  // Propriété d'entrée 'rating' qui représente la note
  @Input() rating: number = 0;

  // Méthode pour obtenir un tableau de booléens représentant l'état rempli ou non de chaque étoile
  get stars(): boolean[] {
    // Nombre total d'étoiles à afficher
    const numStars : number = 5;
    // Tableau de booléens représentant l'état de chaque étoile
    let stars: boolean[] = [];

    // Boucle pour déterminer l'état de chaque étoile en fonction de la note
    for(let i = 0; i < numStars; i++){
      // Remplit les étoiles jusqu'à la note donnée, les autres restent vides
      stars[i] = (i < this.rating) ? true : false;
    }
    // Retourne le tableau d'état des étoiles
    return stars;
  }
}
