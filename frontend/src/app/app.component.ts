import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from './features/auth/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog-frontend';

   constructor(private auth: AuthService,private router: Router) {}
logout() {
  this.auth.logout();
  this.router.navigate(['/auth/login']);
}
 isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
  
}
