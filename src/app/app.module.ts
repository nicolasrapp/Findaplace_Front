import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarteComponent } from './carte/carte.component';

//AIzaSyCkJj6AMvwPFxKKEYm9zDb2zNfGChKh948

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
