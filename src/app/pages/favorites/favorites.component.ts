import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favorites = [
    {
      name: 'Cirmi',
      description: 'Barátságos nőstény cica.',
      image: 'https://placekitten.com/300/200'
    },
    {
      name: 'Bodri',
      description: 'Játékos keverék kutya, imádja a gyerekeket.',
      image: 'https://placedog.net/300/200?id=10'
    }
  ];
}