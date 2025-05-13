// src/app/services/animal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Animal {
  _id?: string;
  name: string;
  age: number;
  species: string;
  breed: string;
  description: string;
  health: string;
  likedBy: string[];
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private baseUrl = 'http://localhost:5000/api/animals';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.baseUrl);
  }
addAnimal(animal: Animal, token: string): Observable<Animal> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Token hozzáadása a fejléchez

    return this.http.post<Animal>(this.baseUrl, animal, { headers });
  }

  getAnimalById(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.baseUrl}/${id}`);
  }
  // src/app/services/animal.service.ts
addToFavorites(animalId: string, token: string) {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(`http://localhost:5000/api/users/favorites/${animalId}`, {}, { headers });
}

removeFromFavorites(animalId: string, token: string) {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete(`http://localhost:5000/api/users/favorites/${animalId}`, { headers });
}

getFavorites(token: string) {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>(`http://localhost:5000/api/users/favorites`, { headers });
}
updateAnimal(id: string, updatedData: Partial<Animal>): Observable<Animal> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put<Animal>(`${this.baseUrl}/${id}`, updatedData, { headers });
}

}
