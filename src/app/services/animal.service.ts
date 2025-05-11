// src/app/services/animal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getAnimalById(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.baseUrl}/${id}`);
  }
}
