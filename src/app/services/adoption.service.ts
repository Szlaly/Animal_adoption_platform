import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface AdoptionRequest {
  _id: string;
  animal: {
    _id: string;
    name: string;
    species?: string;
    // ha kell, ide még lehet tenni mást is (pl. faj, kép)
  };
  user: {
    _id: string;
    username: string;
    email: string;
    // ha kell, email, stb.
  };
  message: string;
  status: string;
  meetingDate?: string;
  createdAt?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private apiUrl = 'http://localhost:5000/api/adoptions'; // Az API URL-je, igazítsd a megfelelő címre

  constructor(private http: HttpClient) {}

  submitAdoptionRequest(animalId: string, message: string, name: string, email: string, meetingDate: string, token: string): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const body = { animalId, message, name, email, meetingDate };
  return this.http.post(this.apiUrl, body, { headers });
}

  getAllAdoptionRequests(token: string) {
  return this.http.get<AdoptionRequest[]>(`${this.apiUrl}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

updateAdoptionStatus(id: string, updateData: any, token: string) {
  return this.http.put(`${this.apiUrl}/${id}`, updateData, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
getMyAdoptionRequests(token: string): Observable<AdoptionRequest[]> {
  return this.http.get<AdoptionRequest[]>(`${this.apiUrl}/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

}
