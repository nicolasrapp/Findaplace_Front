// Importation des modules Angular nécessaires
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ReviewPopupComponent } from '../review-popup/review-popup.component';
import { MatDialog } from '@angular/material/dialog';

/* composant qui crée la barre de navigation de l'application. */

// Définition du composant avec le sélecteur 'app-navbar'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
// Définition de la classe du composant
export class NavbarComponent implements OnInit {
  // Propriété pour stocker les informations de l'utilisateur connecté
  connectedUser: any; // Vous pouvez définir un type/interface User

  // Constructeur du composant, injecte les services nécessaires
  constructor(private userService: UserService, public dialog: MatDialog) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    // Récupère les informations de l'utilisateur connecté à partir du stockage local
    const connectedUserString: string | null = localStorage.getItem('connectedUser');
    this.connectedUser = connectedUserString ? JSON.parse(connectedUserString) : null;
  }

  // Méthode pour gérer la soumission du formulaire (par exemple, déconnexion de l'utilisateur)
  onSubmit() {
    // Supprime les données de l'utilisateur du stockage local
    localStorage.removeItem('connectedUser');
    // Efface les données de l'utilisateur du service
    this.userService.clearConnectedUser();
    // Logique supplémentaire de déconnexion
  }

  // Méthode pour ouvrir la boîte de dialogue de création de revue
  openDialog(): void {
    // Utilise le service MatDialog pour ouvrir la boîte de dialogue
    let dialogRef = this.dialog.open(ReviewPopupComponent, {
      data: {} // Les données à passer à la boîte de dialogue (peut être étendu selon les besoins)
    });
  }

  // Méthode pour gérer la déconnexion de l'utilisateur
  handleLogout() {
    // Supprime les données de l'utilisateur du stockage local
    localStorage.removeItem('connectedUser');
    // Efface les données de l'utilisateur du service
    this.userService.clearConnectedUser();
  }
}
