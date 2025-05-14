import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdoptionService, AdoptionRequest } from '../../services/adoption.service';
import { SupportService, SupportRequest } from '../../services/support.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  adoptionRequests: AdoptionRequest[] = [];
  supportRequests: SupportRequest[] = [];
  errorMessage: string = '';

  constructor(
    private adoptionService: AdoptionService,
    private supportService: SupportService
  ) {}

  ngOnInit() {
    this.fetchAdoptionRequests();
    this.fetchSupportRequests();
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

  fetchSupportRequests() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.supportService.getAllSupportRequests(token).subscribe({
      next: (data) => this.supportRequests = data,
      error: (err) => console.error('Support kérdések lekérdezési hiba:', err)
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
