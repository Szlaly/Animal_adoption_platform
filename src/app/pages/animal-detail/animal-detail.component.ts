import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { RouterModule } from '@angular/router';

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

  animal: any = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.animalService.getAnimalById(id).subscribe({
        next: (data) => this.animal = data,
        error: (err) => console.error('Hiba állat lekérdezésénél:', err)
      });
    }
  }
}
