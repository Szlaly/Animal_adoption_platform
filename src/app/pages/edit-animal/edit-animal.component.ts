import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.scss']
})
export class AnimalEditComponent implements OnInit {
  form!: FormGroup;
  animalId!: string;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.paramMap.get('id') || '';
    this.form = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      breed: [''],
      age: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      health: [''],
      story: [''],
      imageUrl: ['']
    });

    this.loadAnimal();
  }

  loadAnimal() {
    this.animalService.getAnimalById(this.animalId).subscribe({
      next: (animal) => {
        this.form.patchValue({
          name: animal.name,
          species: animal.species,
          breed: animal.breed || '',
          age: animal.age,
          description: animal.description || '',
          health: animal.health || '',
          story: (animal as any).story || '', // story lehet, hogy nincs még a típusban
          imageUrl: animal.imageUrl || ''
        });
      },
      error: (err) => {
        this.errorMessage = 'Nem sikerült betölteni az állat adatait.';
        console.error(err);
      }
    });
  }

  saveChanges() {
    if (this.form.invalid) return;

    this.animalService.updateAnimal(this.animalId, this.form.value).subscribe({
      next: () => {
        this.successMessage = 'Állat sikeresen frissítve!';
        setTimeout(() => this.router.navigate(['/animals', this.animalId]), 1500);
      },
      error: (err) => {
        this.errorMessage = 'Frissítés sikertelen.';
        console.error(err);
      }
    });
  }
}
