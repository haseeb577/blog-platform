import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService,private router: Router) {}

  onRegister() {
  this.auth.register(this.email, this.password).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Account Created',
        text: 'You have successfully registered!',
        confirmButtonColor: '#3085d6'
      });
      this.router.navigate(['/auth/login']);
    },
    error: (err) => {
      if (err.status === 400 || err.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'User Already Exists',
          text: 'Please try logging in instead.',
          confirmButtonColor: '#d33'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'User already exists.',
          confirmButtonColor: '#d33'
        });
      }
    }
  });
}


  goToLogin() {
  this.router.navigate(['/auth/login']);
}
}
