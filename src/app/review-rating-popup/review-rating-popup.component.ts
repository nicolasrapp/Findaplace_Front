// Importation des modules Angular nécessaires
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReviewdataService } from '../reviewdata.service';
import { ReviewService } from 'src/services/review.service';
import { NgxStarsComponent, NgxStarsModule } from 'ngx-stars';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, formatDate } from '@angular/common';
import { PlacedataService } from '../placedata.service';
import { PlaceService } from 'src/services/place.service';
import { UserService } from 'src/services/user.service';
import { TagService } from 'src/services/tag.service';

/* composant qui gere la creation d'un nouvel avis. */

// Définition du composant ReviewRatingPopupComponent
@Component({
  selector: 'app-review-rating-popup',
  templateUrl: './review-rating-popup.component.html',
  styleUrls: ['./review-rating-popup.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxStarsModule,
    FormsModule,
    CommonModule
  ],
})
export class ReviewRatingPopupComponent {
  // Entrées pour la configuration de la notation
  @Input() maxRating=5;
  maxRatingArr : any = [];

  @Input() SelectedStar = 0;

  previousSelection = 0;

  // Références aux éléments visuels
  @ViewChild(NgxStarsComponent)
  starsComponent: NgxStarsComponent | undefined;

  @ViewChild('input')
  input!: ElementRef;

  // Données de critique et de lieu
  reviewData: any;
  placeData: any;
  connectedUser: any;
  placeName: string = '';
  rating: number = 0; // On suppose que la note est un nombre
  comment: string = '';
  tagList: any[]= [];
  selectedTags: string[] = [];

  // Constructeur du composant
  constructor(
    public dialogRef: MatDialogRef<ReviewRatingPopupComponent>, 
    private reviewDataService: ReviewdataService,
    private placeDataService: PlacedataService,
    private userService: UserService,
    private reviewService: ReviewService,
    private placeService: PlaceService,
    private tagservice: TagService
  ) { }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
    this.connectedUser = this.userService.getConnectedUser();

    // Récupère la liste des tags
    this.tagservice.getTags().subscribe((data: any) => {
      this.tagList = data
      console.log(this.tagList)
    })

    // Souscrit aux changements de données de critique
    this.reviewDataService.reviewData$.subscribe((data: any) => {
      this.reviewData = data;
    });

    // Si des données de critique sont disponibles, les utilise
    if (this.reviewData != null) {
      this.placeName = this.reviewData.place.name;
      this.rating = this.reviewData.rate
      this.SelectedStar = this.rating;
      this.comment = this.reviewData.comment;
      this.starsComponent?.setRating(this.rating);
    } else {
      // Sinon, souscrit aux changements de données de lieu
      this.placeDataService.placeData$.subscribe((data: any) => {
        this.placeData = data;
        this.placeName = data.name;
        this.starsComponent?.setRating(this.rating);
      });
    }
  }

  // Méthode appelée lorsqu'une note est définie
  onRatingSet(rating: number): void {
    this.rating = rating + 1;
    this.SelectedStar = rating + 1;
    this.previousSelection = this.SelectedStar;
  }

  // Méthode appelée lorsqu'une étoile est survolée
  handleMouseEnter(index: any) {
    this.SelectedStar = index + 1;
  }

  // Méthode appelée lorsqu'on quitte la zone des étoiles
  handleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.SelectedStar = this.previousSelection;
    } else {
      this.SelectedStar = 0;
    }
  }

  // Méthode appelée lors de la soumission de la notation
  submitRating(): void {
    // Gère la soumission de la notation

    // Si des données de critique sont disponibles
    if (this.reviewData != null) {
      this.reviewData.rate = this.rating;
      this.reviewData.comment = this.comment;

      // Met à jour la critique
      if (this.reviewData.id != '') {
        this.reviewService.updateReview(this.reviewData).subscribe(
          (response) => {
            console.log('Critique mise à jour avec succès :', response);
            // Ferme la boîte de dialogue actuelle et en ouvre une nouvelle
            this.dialogRef.close();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la critique :', error);
          }
        );
      }

      // Enregistre la critique
      this.reviewService.registerReview(this.reviewData).subscribe(
        (response) => {
          console.log('Critique enregistrée avec succès :', response);
          // Ferme la boîte de dialogue actuelle et en ouvre une nouvelle
          this.dialogRef.close();
        },
        (error) => {
          console.error('Erreur lors de lenregistrement de la critique :', error);
        }
      );
    } else {
      // Si aucune donnée de critique n'est disponible

      // Enregistre le lieu
      this.placeService.registerPlace(this.placeData).subscribe(
          (response) => {
            console.log('Lieu enregistré avec succès :', response);
      
            // Récupère le lieu enregistré
            this.placeService.getPlaceByGoogleId(this.placeData?.id_place_google)
              .subscribe(
                (data: any) => {
                  this.placeData = data;
                  console.log(this.placeData);
      
                  // Une fois les données de lieu récupérées, procède à la création des données de critique
                  const reviewData = {
                    id: '',
                    rate: this.rating,
                    comment: this.comment,
                    date_publication: formatDate(new Date(), 'yyyy-MM-dd', 'fr'),
                    users: this.connectedUser,
                    place: this.placeData
                  };
      
                  // Enregistre la critique
                  this.reviewService.registerReview(reviewData).subscribe(
                    (response) => {
                      console.log('Critique enregistrée avec succès :', response);
                      // Ferme la boîte de dialogue actuelle et en ouvre une nouvelle
                      this.reviewDataService.setReviewData(this.placeData);
                      this.dialogRef.close();
                    },
                    (error) => {
                      console.error('Erreur lors de lenregistrement de la critique :', error);
                    }
                  );
                },
                (error: any) => {
                  console.error('Erreur lors de la récupération des données du lieu :', error);
                }
              );
          },
          (error) => {
            console.error('Erreur lors de lenregistrement du lieu :', error);
          }
        );
    }    
  }
}
