import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { users } from 'src/users';
import { UserService } from '../user.service';
import { APIURL } from 'src/config';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false; // Add a login error flag

  constructor(private router: Router,  private userService: UserService, private http: HttpClient) {}

  onSubmit() {

  const url = APIURL + '/user/' + this.username + '/' + this.password;
  console.log(url)

  this.http.get<any>(url).subscribe(
    (response) => {
      // Check if the response indicates a successful login (e.g., the response contains user data)
      if (response) {
        // Handle the successful login (e.g., store user data, navigate to home)
        this.userService.setConnectedUser(response); // Set the connected user's data
        localStorage.setItem('connectedUser', JSON.stringify(response)); // Store user data in local storage
        this.router.navigate(['/home']);
        console.log(this.userService.getConnectedUser())
      } else {
        this.loginError = true;
      }
    },
    (error) => {
      this.loginError = true;
    }
  );
  }

  redirectToSignup() {
    this.router.navigate(['/register']);
  }
}
