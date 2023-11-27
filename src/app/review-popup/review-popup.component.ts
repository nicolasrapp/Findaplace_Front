// Importation des modules Angular nécessaires
import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  Input,
  ElementRef,
  NgZone,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxGpAutocompleteDirective, NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';
import { MapService } from '../../services/map.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewRatingPopupComponent } from '../review-rating-popup/review-rating-popup.component';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { DatePipe, formatDate } from '@angular/common';
import { PlaceService } from 'src/services/place.service';
import { ReviewdataService } from '../reviewdata.service';
import { PlacedataService } from '../placedata.service';

/* composant qui permet de creer le formulaire de creation d'un nouvel avis. */

// Interface pour les résultats de recherche de lieu
export interface PlaceSearchResult {
  id?: null,
  id_place_google?: string,
  address?: string;
  location?: string;
  images?: string;
  icon?: string;
  name?: string;
}

/** @title Simple form field */
@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxGpAutocompleteModule
  ],
})
export class ReviewPopupComponent implements OnInit {
  @ViewChild('input')
  input!: ElementRef;

  @ViewChild('ngxPlaces')
  placesRef!: NgxGpAutocompleteDirective;

  @Input() placeholder = 'Entrer une adresse';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  selectedPlace: PlaceSearchResult | undefined;

  placeData: any;

  connectedUser: any;

  // Constructeur du composant, injecte le service de la carte, le service de données de critique, etc.
  constructor(public dialogRef: MatDialogRef<ReviewPopupComponent>,
    public dialog: MatDialog,
     private ngZone: NgZone, 
     private mapService: MapService,
     private reviewDataService: ReviewdataService,
     private placeDataService: PlacedataService,
     private reviewService: ReviewService,
     private placeService: PlaceService,
     private userService: UserService) {
  }

  // Limites de la carte par défaut
  bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds(
    { lat: 48.815573, lng: 2.224199 }, // Coin sud-ouest
    { lat: 48.902145, lng: 2.469920 } // Coin nord-est
  );

  // Options de recherche de lieu
  options = {
    types: ["restaurant", "cafe", "bar"],
    bounds: this.bounds,
    componentRestrictions: { country: 'FR' },
  };

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Récupère l'utilisateur connecté depuis le service utilisateur
    this.connectedUser = this.userService.getConnectedUser();

    // Récupère les limites de la carte depuis le service de la carte
    const mapBounds = this.mapService.mapBounds;

    // Si des limites sont disponibles, les utilise
    if (mapBounds) {
      this.bounds = mapBounds;
      this.options = {
        types: ["restaurant"],
        bounds: mapBounds,
        componentRestrictions: { country: 'FR' },
      };
    }
  }

  // Méthode appelée après l'initialisation de la vue
  async ngAfterViewInit() {
  }

  // Méthode appelée lorsqu'un lieu est sélectionné dans la barre de recherche
  onPlaceSelected(place: google.maps.places.PlaceResult) {
    // Crée un objet formatté avec les informations du lieu sélectionné
    const formattedPlace: PlaceSearchResult = {
      id: null,
      id_place_google: place.place_id,
      address: this.input.nativeElement.value,
      name: place.name,
      location: place.geometry?.location?.toString(),
      images: this.getPhotoUrl(place),
      icon: place.icon,
    }
    // Émet un événement avec le lieu sélectionné
    this.selectedPlace = formattedPlace;
  }

  // Méthode pour obtenir l'URL de la première photo d'un lieu (s'il y en a une)
  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }

  // Méthode appelée pour passer à l'étape suivante
  nextStep(): void {
    // Vérifie si le lieu sélectionné existe déjà
    this.placeService.getPlaceByGoogleId(this.selectedPlace?.id_place_google)
    .subscribe(
      (data: any) => {
        // Traite les données ici
        this.placeData = data;

        // Si le lieu existe
        if (this.placeData != null) {
          // Vérifie si une critique existe déjà pour ce lieu et cet utilisateur
          this.reviewService.getReviewForPlaceAndUser(this.placeData.id, this.connectedUser.id).subscribe(
            (data: any) => {
              if (data != null) {
                // Si une critique existe, la récupère, la sauvegarde et ouvre le popup de notation
                this.reviewDataService.setReviewData(data);
                this.dialogRef.close();
                this.dialog.open(ReviewRatingPopupComponent);
              } else {
                // Si aucune critique n'existe, crée une nouvelle critique, la sauvegarde et ouvre le popup de notation
                const reviewData = {
                  id: '',
                  rate: 0,
                  comment: "",
                  date_publication: formatDate(new Date(), 'yyyy-MM-dd', 'fr'),
                  users: this.connectedUser,
                  place: this.placeData
                };
  
                this.reviewDataService.setReviewData(reviewData);
                this.dialogRef.close();
                this.dialog.open(ReviewRatingPopupComponent);
              }
            },
            (error: any) => {
              console.error('Erreur lors de la récupération de la critique pour le lieu et l\'utilisateur :', error);
            }
          )
        } else {
          // Si le lieu n'existe pas, sauvegarde le lieu sélectionné et ouvre le popup de notation
          if (this.selectedPlace != null) {
            this.placeDataService.setPlaceData(this.selectedPlace);
            this.dialogRef.close();
            this.dialog.open(ReviewRatingPopupComponent);
          }
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des données du lieu :', error);
      }
    );
  }
}
