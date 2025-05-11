import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  get user() {
    return this.auth.currentUser;
  }
   logout() {
    this.auth.logout();
    this.router.navigate(['/']);
    location.reload();
  }
}
