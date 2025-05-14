import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AnimalService, Animal } from '../../services/animal.service';
import { AdoptionService, AdoptionRequest } from '../../services/adoption.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private animalService = inject(AnimalService);
  private adoptionService = inject(AdoptionService);

  user: any = null;
  favorites: Animal[] = [];
  adoptionRequests: AdoptionRequest[] = [];

  ngOnInit() {
    this.user = this.authService.currentUser;

    const token = localStorage.getItem('token');
    if (token) {
      this.animalService.getFavorites(token).subscribe({
        next: (res) => this.favorites = res.favorites,
        error: (err) => console.error('Nem sikerült lekérni a kedvenceket:', err)
      });

      this.adoptionService.getMyAdoptionRequests(token).subscribe({
        next: (res) => this.adoptionRequests = res,
        error: (err) => console.error('Nem sikerült lekérni az örökbefogadási kérelmeket:', err)
      });
    }
  }
}
