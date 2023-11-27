import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';

/* composant qui permet de creer la partie d'ajouts d'amis sur la page profil */

@Component({
  selector: 'app-addfriends',
  templateUrl: './addfriends.component.html',
  styleUrls: ['./addfriends.component.scss']
})
export class AddfriendsComponent implements OnInit, OnChanges {
  searchQuery: any;
  users: any[] = [];
  connectedUser: any; 
  followersList: any[] = []; 

  constructor(private userService: UserService, private router: Router, private cdr: ChangeDetectorRef, private zone: NgZone) {}

  ngOnInit() {
    // Au chargement du composant, récupère tous les utilisateurs et les abonnés du utilisateur connecté
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
      this.connectedUser = this.userService.getConnectedUser();

      // Assurez-vous que this.connectedUser est défini avant de l'utiliser
      if (this.connectedUser) {
        // Filtre la liste des utilisateurs pour exclure le utilisateur connecté
        this.users = this.users.filter(user => user.id !== this.connectedUser.id);

        // Souscrit à l'observable pour obtenir les données des abonnés
        this.userService.getFollowers(this.connectedUser.id).subscribe((followers: any) => {
          console.log(followers);

          // Vous pouvez maintenant utiliser les données des abonnés comme une liste d'objets
          // Par exemple, vous pouvez l'assigner à une variable de classe
          this.followersList = followers;
        });
      }
    });
  }

  // Vérifie si un utilisateur est suivi par le utilisateur connecté
  isUserFollowing(user: any): boolean {
    return this.followersList && this.followersList.some(follower => follower.id === user.id);
  }

  // Suit un utilisateur
  followUser(user: any){
    const userId = user.id;
    this.userService.addFriend(userId);
    console.log("Suivre");
    this.zone.run(() => this.cdr.detectChanges());
  }

  // Ne suit plus un utilisateur
  unFollowUser(user: any){
    const userId = user.id;
    this.userService.deleteFriend(userId);
    //this.zone.run(() => this.cdr.detectChanges());

  }

  // Méthode appelée lorsqu'il y a des changements dans les propriétés d'entrée du composant
  ngOnChanges(changes: SimpleChanges): void {
    // Code à exécuter lorsqu'il y a des changements dans les propriétés d'entrée
    console.log("Changement");
  }
}
