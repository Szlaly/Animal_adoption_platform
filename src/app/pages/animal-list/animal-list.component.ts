import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule], // fontos az ngFor miatt
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent {
  animals = [
    {
      name: 'Cirmi',
      description: 'Barátságos nőstény cica.',
      image: 'https://placekitten.com/300/200'
    },
    {
      name: 'Buksi',
      description: 'Vidám és aktív keverék kutya.',
      image: 'https://placedog.net/300/200?id=2'
    }
  ];
}
