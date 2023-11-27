// Importation des modules Angular nécessaires
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { APIURL } from 'src/config';
import { HttpClient } from '@angular/common/http'; // Importation du module HttpClient

/* composant qui gere la logique de connexion. */

// Définition du composant avec le sélecteur 'app-login'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Propriétés pour stocker le nom d'utilisateur, le mot de passe et un indicateur d'erreur de connexion
  username: string = '';
  password: string = '';
  loginError: boolean = false; // Ajout d'un indicateur d'erreur de connexion

  // Constructeur du composant, injecte les services nécessaires
  constructor(private router: Router, private userService: UserService, private http: HttpClient) {}

  // Méthode appelée lors de la soumission du formulaire de connexion
  onSubmit() {
    // Construction de l'URL pour la requête de connexion en utilisant l'APIURL, le nom d'utilisateur et le mot de passe
    const url = APIURL + '/user/' + this.username + '/' + this.password;
    console.log(url);

    // Utilisation du module HttpClient pour effectuer une requête GET
    this.http.get<any>(url).subscribe(
      // Gestion de la réponse de la requête
      (response) => {
        // Vérifie si la réponse indique une connexion réussie (par exemple, si la réponse contient des données utilisateur)
        if (response) {
          // Traite la connexion réussie (par exemple, en stockant les données utilisateur, en naviguant vers la page d'accueil)
          //this.userService.setConnectedUser(response); // Définit les données de l'utilisateur connecté
          localStorage.setItem('connectedUser', JSON.stringify(response)); // Stocke les données utilisateur dans le stockage local
          this.userService.setConnectedUser(JSON.stringify(response));
          this.router.navigate(['/home']); // Redirige vers la page d'accueil
          console.log(this.userService.getConnectedUser());
        } else {
          // En cas d'échec de connexion, active l'indicateur d'erreur de connexion
          this.loginError = true;
        }
      },
      // Gestion des erreurs de la requête
      (error) => {
        // En cas d'erreur, active également l'indicateur d'erreur de connexion
        this.loginError = true;
      }
    );
  }

  // Méthode pour rediriger vers la page d'inscription
  redirectToSignup() {
    this.router.navigate(['/register']);
  }
}
