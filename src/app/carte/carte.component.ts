import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ApplicationRef, Injector, EmbeddedViewRef, ComponentFactoryResolver } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { Loader } from '@googlemaps/js-api-loader';
import { mapstyle } from 'src/mapstyle';
import { PlaceService } from 'src/services/place.service';
import { PlacePopupComponent } from '../place-popup/place-popup.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';

/* ce composant crée la carte en utilisant l'API google maps et recupere tout les spots pour en creer a son initialisation des markers
qui sont posés sur la carte. Le composant gere egalement la création des popup quand on clique sur un des markers sur la carte. */

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']  
})
export class CarteComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMapElement', { static: false }) googleMapElement!: GoogleMap;

  Allplaces: any[] = [];

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 48.864716,
    lng: 2.349014
  };
  zoom = 13;
  markers: google.maps.Marker[] = [];
  googleMap: google.maps.Map | undefined;

  // Méthode appelée lors du déplacement de la carte
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  // Méthode appelée lors du déplacement de la carte avec une action spécifique
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  // Options de la carte Google
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    styles: mapstyle
  };

  constructor(private router: Router, private loader: Loader, private placeservice: PlaceService, private sanitizer: DomSanitizer,
    private renderer2: Renderer2,  private elementRef: ElementRef) {}

  // Récupère les limites de la carte
  getBounds(): google.maps.LatLngBounds | undefined {
    if (this.googleMap) {
      return this.googleMap.getBounds() || undefined;
    }
    return undefined;
  }

  // Centre la carte sur la position actuelle de l'utilisateur
  moveToLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.center = pos;
          this.googleMap?.setZoom(14);
        },
        () => {
          this.handleLocationError(true, this.infoWindow, this.center);
        }
      );
    } else {
      // Le navigateur ne prend pas en charge la géolocalisation
      this.handleLocationError(false, this.infoWindow, this.center);
    }
  }

  // Gère les erreurs liées à la géolocalisation
  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLngLiteral
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Erreur : le service de géolocalisation a échoué."
        : "Erreur : votre navigateur ne prend pas en charge la géolocalisation."
    );
    infoWindow.open(this.googleMap);
  }

  infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
  
  ngOnInit() {
    // Récupère toutes les places depuis le service
    this.placeservice.getAllPlaces().subscribe((data: any) => {
      this.Allplaces = data;
      this.Allplaces.forEach(place => {
        // Extrait la latitude et la longitude de la chaîne de localisation
        const [latitudeStr, longitudeStr] = place.location
          .replace('(', '')
          .replace(')', '')
          .split(', ');

        // Convertit les chaînes en nombres
        const latitude = parseFloat(latitudeStr);
        const longitude = parseFloat(longitudeStr);

        // Ajoute un marqueur pour chaque place
        this.addMarker(latitude, longitude, place.name, place);
      });
    });
  }

  ngAfterViewInit(): void {
    // Une fois que la carte Google est initialisée, la référence est mise à jour
    const map = this.googleMapElement.googleMap;
    if (map) {
      this.googleMap = map;
    }
  }

  // Définition des options pour l'image du marqueur
  image = {
    url: "assets/pins/blue.png",
    scaledSize: new google.maps.Size(36, 52),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32),
  };

  // Ajoute un marqueur à la carte
  addMarker(lati: any, long: any, title: any, place: any) {
    const newMarker = new google.maps.Marker({
      position: { lat: lati, lng: long },
      title: title,
      map: this.googleMap,
      icon: this.image,
    });
    
    const infoWindow = new google.maps.InfoWindow({
      content: this.CreatePopupContent(place),
    });

    // Gère l'événement de clic sur le marqueur
    newMarker.addListener('click', () => {
      infoWindow.open(this.googleMap, newMarker);
    });

    // Gère l'événement 'domready' (quand le contenu de l'info-bulle est prêt)
    google.maps.event.addListener(infoWindow, 'domready', () => {
      const voirPlusButton = document.getElementById('voirplusbutton');
      if (voirPlusButton) {
        voirPlusButton.addEventListener('click', () => {
          this.router.navigate([`/place`, place.id]);
        });
      }
    });

    // Ajoute le marqueur à la liste
    this.markers.push(newMarker);
  }

// crée le popup présent dans l'infobulle a partir d'un str qui contient tout le html css nécessaire
CreatePopupContent(place: any){
  const contentpopup = `
  <style>
  .infowindow-content {
      font-family: Arial, sans-serif;
      max-width: 300px;
  }

  .place-name h1 {
      color: black;
      font-weight: 700;
      font-size: 16px;
      margin: 0;
  }

  .address p {
      color: black;
      font-weight: 400;
      font-size: 12px;
      margin: 0;
      margin-top: 5px;
  }

  .tag p {
      margin-top: 10px;
      background-color: #FFC480;
      padding: 4px 12px;
      border-radius: 50px;
      color: white;
      font-size: 12px;
      font-weight: 300;
      width: 60px;
  }

  .rating-line {
      margin-top: 10px;
  }

  .people .icon,
  .people .icon-plus {
      background-color: #FF9797;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
  }

  .people .icon-plus {
      background-color: white;
      border: 1px solid black;
      color: black;
  }

  .rating p {
      color: black;
      margin: 0;
      font-size: 14px;
      font-weight: 400;
  }

  .photos {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
  }

  .photo,
  .photos-plus {
      width: 100%;
      height: 150px;
      margin-right: 5px;
      margin-bottom: 5px;
      overflow: hidden;
      border-radius: 8px;
  }

  .photo img,
  .photos-plus img {
      width: 100%;
      height: 100%;
      object-fit: cover;
  }

  .voir-plus-button {
    margin-top: 5px;
    text-align: center;
  }

  .voir-plus-button button {
    background-color: #FFEAB2; /* Green background color */
    color: black;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }
  .voir-plus-button button:hover {
    color: white;
    background-color: #FFC480; /* Darker green on hover */
  }

  
</style>

<div class="infowindow-content">
  <div class="place-name">
      <h1>${place.name}</h1>
  </div>
  <div class="address">
      <p>${place.address}</p>
  </div>
  <div class="tag">
      <p>Italian</p>
  </div>
  
  <div class="photos" *ngIf="place.images">
      <div class="photo">
          <img src=${place.images}>
      </div>
      
  </div>
  <div class="voir-plus-button">
  <button id="voirplusbutton" >Voir Plus</button>
  </div>
</div>`

return contentpopup
}

}


