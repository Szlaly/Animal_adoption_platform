import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Animal_Adopt_Proj';

  constructor(public authService: AuthService) {}

  get navLinks() {
    const user = this.authService.currentUser;
    return [
      { path: '/', label: 'Főoldal', show: true },
      { path: '/animals', label: 'Állatok', show: true },
      { path: '/login', label: 'Bejelentkezés', show: !user },
      { path: '/register', label: 'Regisztráció', show: !user },
      { path: '/support', label: 'Szupport', show: true },
      { path: '/adoption-request', label: 'Időpont', show: true },
      { path: '/admin', label: 'Admin felület', show: user?.role === 'admin' },
      { path: '/profile', label: 'Profilom', show: !!user }
    ];
  }

  hasPreviousVisible(index: number): boolean {
    return this.navLinks.slice(0, index).some(link => link.show);
  }
}

