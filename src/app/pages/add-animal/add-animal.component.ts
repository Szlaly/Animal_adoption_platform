import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';

@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent {
  animal: Animal = {
    name: '',
    age: 0,
    species: '',
    breed: '',
    description: '',
    health: '',
    likedBy: [],
    imageUrl: ''
  };

  constructor(private animalService: AnimalService, private router: Router) {}

  submitAnimal() {
    const token = localStorage.getItem('token'); // Token lekérése a localStorage-ból
    if (!token) {
      console.error('Token nem található'); // Hiba, ha nincs token
      return;
    }

    // A kérés elküldése a token hozzáadásával
    this.animalService.addAnimal(this.animal, token).subscribe({
      next: (newAnimal) => {
        console.log('Állat sikeresen hozzáadva:', newAnimal);
        this.router.navigate(['/animals']);
      },
      error: (err) => {
        console.error('Hiba az állat hozzáadásakor:', err);
        if (err.status === 401) {
          console.log('Hiba: nem vagy autentikálva.');
        }
      }
    });
  }
}
