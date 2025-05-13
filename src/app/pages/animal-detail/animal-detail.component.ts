import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './animal-detail.component.html',
  styleUrl: './animal-detail.component.scss'
})
export class AnimalDetailComponent {
  private route = inject(ActivatedRoute);
  private animalService = inject(AnimalService);
  private authService = inject(AuthService);

  animal: any = null;
  token: string | null = null;
  isFavorite: boolean = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('token');

    if (id) {
      this.animalService.getAnimalById(id).subscribe({
        next: (data) => {
          this.animal = data;
          this.checkIfFavorite();
        },
        error: (err) => console.error('Hiba állat lekérdezésénél:', err)
      });
    }
  }

  checkIfFavorite() {
    if (!this.token || !this.animal?._id) return;

    this.animalService.getFavorites(this.token).subscribe({
      next: (res) => {
        const favorites = res.favorites.map((fav: any) => fav._id);
        this.isFavorite = favorites.includes(this.animal._id);
      },
      error: (err) => console.error('Kedvencek lekérdezési hiba:', err)
    });
  }

  toggleFavorite() {
    if (!this.token || !this.animal?._id) return;

    if (this.isFavorite) {
      this.animalService.removeFromFavorites(this.animal._id, this.token).subscribe({
        next: () => {
          this.isFavorite = false;
        },
        error: (err) => console.error('Nem sikerült eltávolítani a kedvencekből:', err)
      });
    } else {
      this.animalService.addToFavorites(this.animal._id, this.token).subscribe({
        next: () => {
          this.isFavorite = true;
        },
        error: (err) => console.error('Nem sikerült hozzáadni a kedvencekhez:', err)
      });
    }
  }

  isLoggedIn() {
    return !!this.token;
  }
}
