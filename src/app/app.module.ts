import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarteComponent } from './carte/carte.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // Import FormsModule



  import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlacePopupComponent } from './place-popup/place-popup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';


//AIzaSyCkJj6AMvwPFxKKEYm9zDb2zNfGChKh948

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarteComponent,
    PlacePopupComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
