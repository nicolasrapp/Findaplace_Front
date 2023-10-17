import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  prenom: string = '';
  nom: string = '';
  pseudo: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    const newUser = {
      email: this.email,
      nom: this.nom,
      prenom: this.prenom,
      pseudo: this.pseudo,
      mot_de_passe: this.password
    };
  
    // Add the new user to the users data
    users[0].utilisateurs.push(newUser);
  
    // Optional: Save the updated users data to local storage for persistence
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/login']);
  }
}
