import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false; // Add a login error flag

  constructor(private router: Router,  private userService: UserService) {}

  onSubmit() {
  const userData = users[0].utilisateurs.find(user => user.pseudo === this.username);

  if (userData && userData.mot_de_passe === this.password) {
    this.userService.setConnectedUser(userData); // Set the connected user's data
    localStorage.setItem('connectedUser', JSON.stringify(userData)); // Store user data in local storage
    this.router.navigate(['/home']);
  } else {
    this.loginError = true;
  }
  }

  redirectToSignup() {
    this.router.navigate(['/register']);
  }
}
