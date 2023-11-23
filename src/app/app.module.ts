import { Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RatingReview} from './lil_component/ratingStars/rating-review.component';
import {StarComponent} from './lil_component/ratingStars/star.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarteComponent } from './carte/carte.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlacePopupComponent } from './place-popup/place-popup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfilComponent } from './profil/profil.component';
import { AddfriendsComponent } from './addfriends/addfriends.component';
import { FilterUsersPipe } from './filterusers.pipe';

import { ReviewPopupComponent } from './review-popup/review-popup.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { MyAdressesComponent } from './my-adresses/my-adresses.component';
import { MyReviewComponent } from './my-review/my-review.component';
import { TagComponent } from './lil_component/tags/tags.component';
import { MapService } from '../services/map.service';
import { ReviewRatingPopupComponent } from './review-rating-popup/review-rating-popup.component';
import { NgxStarsModule } from 'ngx-stars';
import { PlaceComponent } from './place/place.component';

//AIzaSyCkJj6AMvwPFxKKEYm9zDb2zNfGChKh948

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarteComponent,
    PlacePopupComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfilComponent,
    AddfriendsComponent,
    FilterUsersPipe,
    MyAdressesComponent,
    MyReviewComponent,
    StarComponent,
    RatingReview,
    TagComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxGpAutocompleteModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    NgxStarsModule,
    ReviewPopupComponent
  ],
  providers: [
    {
      provide: Loader,
      useValue: new Loader({
        apiKey: 'AIzaSyCkJj6AMvwPFxKKEYm9zDb2zNfGChKh948',
        libraries: ['places']
      })
    },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    MapService
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
