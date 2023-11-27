import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AddfriendsComponent } from '../addfriends/addfriends.component';

/* composant qui affiche le profil de l'utilisateur. il implemente egalement le composant add friends pour la gestion des amis. */

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
 
  connectedUser: any; // You can define a User type/interface
  constructor(private userService: UserService) {
    this.connectedUser = this.userService.getConnectedUser();
  }

}
