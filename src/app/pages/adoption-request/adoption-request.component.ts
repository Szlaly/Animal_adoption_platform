import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdoptionService } from '../../services/adoption.service';
import { AnimalService, Animal } from '../../services/animal.service';

@Component({
  selector: 'app-adoption-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adoption-request.component.html',
  styleUrls: ['./adoption-request.component.scss']
})
export class AdoptionRequestComponent implements OnInit {
  animals: Animal[] = []; // Állatok listája
  animalId: string = ''; // Az állat ID-ja, amit a felhasználó választ
  name: string = '';
  email: string = '';
  meetingDate: string = '';
  message: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private adoptionService: AdoptionService,
    private animalService: AnimalService,
    private router: Router
  ) {}

  // Inicializáláskor lekérjük az állatok listáját
  ngOnInit() {
    this.fetchAnimals();
  }

  fetchAnimals() {
    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animals = data; // Állatok listája
      },
      error: (err) => {
        this.errorMessage = 'Nem sikerült betölteni az állatokat.';
      }
    });
  }

  submitAdoptionRequest() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Bejelentkezés szükséges.';
      return;
    }

    // Ellenőrizzük, hogy minden mező ki van-e töltve
    if (this.animalId && this.message && this.name && this.email && this.meetingDate) {
      this.adoptionService
        .submitAdoptionRequest(
          this.animalId,
          this.message,
          this.name,
          this.email,
          this.meetingDate,
          token
        )
        .subscribe({
          next: () => {
            this.successMessage = 'A kérelmet sikeresen elküldtük!';
            setTimeout(() => this.router.navigate(['/animals']), 2000);
          },
          error: (err) => {
            this.errorMessage = err.error.message || 'Hiba történt a kérelem beküldése közben.';
          }
        });
    } else {
      this.errorMessage = 'Kérlek, tölts ki minden mezőt!';
    }
  }
}
