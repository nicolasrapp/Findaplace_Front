import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/users';
import { UserService } from '../user.service';

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

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    const newUser = {
      id: '',
      user_name: this.pseudo,
      last_name: this.nom,
      first_name: this.prenom,
      password: this.password,
      email: this.email,
    };

    this.userService.registerUser(newUser).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        localStorage.setItem('users', JSON.stringify(users));
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  
  }
}
