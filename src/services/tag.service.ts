// tag.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/config';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root' // Service disponible au niveau racine de l'application
})
export class TagService {

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les tags
  getTags() {
    return this.http.get(`${APIURL}/tags`);
  }

  // Méthode pour récupérer les tags associées à une critique par son ID
  getTagsOfReview(id: any) {
    return this.http.get(`${APIURL}/tags/${id}`);
  }
}
