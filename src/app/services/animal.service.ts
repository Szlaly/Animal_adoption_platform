import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  getAnimals(): Observable<Animal[]> {
    // Később itt hívjuk majd a backendet
    return of([
      { id: 1, name: 'Bodri', breed: 'keverék', age: 4 },
      { id: 2, name: 'Cirmi', breed: 'házi cica', age: 2 },
    ]);
  }
}

