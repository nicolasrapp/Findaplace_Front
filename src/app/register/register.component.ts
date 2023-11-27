// Importation des modules Angular nécessaires
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/users'; // Assurez-vous que cette importation est nécessaire et correcte
import { UserService } from '../../services/user.service';

/* composant qui gere la creation de compte. */

// Définition du composant avec le sélecteur 'app-register'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
// Définition de la classe du composant
export class RegisterComponent {
  // Propriétés pour stocker les informations du nouvel utilisateur
  prenom: string = '';
  nom: string = '';
  pseudo: string = '';
  email: string = '';
  password: string = '';

  // Constructeur du composant, injecte le routeur et le service utilisateur nécessaires
  constructor(private router: Router, private userService: UserService) {}

  // Méthode appelée lors de la soumission du formulaire d'inscription
  onSubmit() {
    // Crée un nouvel utilisateur avec les informations fournies dans le formulaire
    const newUser = {
      id: '', // Assurez-vous que le service utilisateur attribue un ID approprié
      user_name: this.pseudo,
      first_name: this.prenom,
      last_name: this.nom,
      password: this.password,
      email: this.email,
    };

    // Utilise le service utilisateur pour enregistrer le nouvel utilisateur
    this.userService.registerUser(newUser).subscribe(
      (response) => {
        console.log('Utilisateur enregistré avec succès :', response);
        // Stocke temporairement les utilisateurs (à des fins de démonstration) dans le stockage local
        localStorage.setItem('users', JSON.stringify(users));
        // Redirige l'utilisateur vers la page de connexion après l'inscription réussie
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de linscription de lutilisateur :', error);
      }
    );
  }
}
