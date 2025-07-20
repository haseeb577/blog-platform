import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService,private router: Router) {}

onLogin() {
  this.auth.login(this.email, this.password).subscribe({
    next: (res) => {
      this.auth.saveToken(res.access_token,this.email);
      
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
        confirmButtonColor: '#3085d6'
      });
      this.router.navigate(['/posts']);
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Login',
        text: 'Invalid email or password. Please try again.',
        confirmButtonColor: '#d33'
      });
    }
  });
}


goToRegister() {
  this.router.navigate(['/auth/register']);
}

}
