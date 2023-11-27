// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from 'src/config';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root' // Service disponible au niveau racine de l'application
})
export class UserService {
  private connectedUser: any; // Vous pouvez définir un type/interface pour l'utilisateur
  userData: any; // Remplacez 'any' par votre type d'utilisateur réel

  constructor(private http: HttpClient) {
    const connectedUserString : string | null = localStorage.getItem('connectedUser');
    this.connectedUser = connectedUserString ? JSON.parse(connectedUserString) : null;
  }

  // Méthode pour obtenir l'utilisateur connecté
  getConnectedUser() {
    return this.connectedUser;
  }

  // Méthode pour enregistrer un nouvel utilisateur
  registerUser(userData: any) {
    return this.http.post(`${APIURL}/user`, userData);
  }

  // Méthode pour obtenir tous les utilisateurs
  getAllUsers() {
    return this.http.get(`${APIURL}/user`);
  }
  
  // Méthode pour obtenir un utilisateur par son ID
  getUser(id: any) {
    return this.http.get(`${APIURL}/user/${id}`);
  }

  // Méthode pour ajouter un ami
  addFriend(friendid: any) {
    this.getUser(friendid).pipe(
      switchMap((user) => {
        this.userData = user;
        var me = this.connectedUser;
        return this.http.post(`${APIURL}/relation?follower=${me.id}&followed=${this.userData.id}`, null);
      })
    ).subscribe(
      (response) => {
        console.log('Ami ajouté avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de lajout dun ami :', error);
      }
    );
  }

  // Méthode pour supprimer un ami
  deleteFriend(friendid: any) {
    this.getUser(friendid).pipe(
      switchMap((user) => {
        this.userData = user;
        var me = this.connectedUser;
        return this.http.delete(`${APIURL}/relation?follower=${me.id}&followed=${this.userData.id}`);
      })
    ).subscribe(
      (response) => {
        console.log('Ami supprimé avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de la suppression dun ami :', error);
      }
    );
  }

  // Méthode pour obtenir les followers d'un utilisateur
  getFollowers(id: any) {
    return this.http.get(`${APIURL}/user/followers/${id}`);
  }

  // Méthode pour définir l'utilisateur connecté
  setConnectedUser(connectedUserString: string) {
    this.connectedUser = connectedUserString;
  }

  // Méthode pour effacer l'utilisateur connecté
  clearConnectedUser() {
    this.connectedUser = null;
  }
}
