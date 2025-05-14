import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SupportRequest {
  _id: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private baseUrl = 'http://localhost:5000/api/support';

  constructor(private http: HttpClient) {}

  createSupportRequest(subject: string, message: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, { subject, message }, { headers });
  }

  getAllSupportRequests(token: string): Observable<SupportRequest[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<SupportRequest[]>(this.baseUrl, { headers });
  }
  getUserSupportRequests(token: string): Observable<SupportRequest[]> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<SupportRequest[]>(`${this.baseUrl}/my`, { headers });
}

}
