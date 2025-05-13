import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdoptionService, AdoptionRequest } from '../../services/adoption.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  adoptionRequests: AdoptionRequest[] = [];
  errorMessage: string = '';

  constructor(private adoptionService: AdoptionService) {}

  ngOnInit() {
    this.fetchAdoptionRequests();
  }

  fetchAdoptionRequests() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Hiányzik a token.';
      return;
    }

    this.adoptionService.getAllAdoptionRequests(token).subscribe({
      next: (data) => this.adoptionRequests = data,
      error: (err) => this.errorMessage = err.error.message || 'Hiba történt a kérelmek lekérésekor.'
    });
  }

  updateRequestStatus(id: string, status: string, meetingDate?: string) {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.adoptionService.updateAdoptionStatus(id, { status, meetingDate }, token).subscribe({
      next: () => this.fetchAdoptionRequests(),
      error: (err) => console.error('Frissítés sikertelen:', err)
    });
  }
}
