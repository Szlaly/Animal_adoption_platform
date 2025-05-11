import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animals = data;
      },
      error: (err) => {
        console.error('Állatok betöltése sikertelen:', err);
      }
    });
  }
}
