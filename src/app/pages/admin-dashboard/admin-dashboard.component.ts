import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AdoptionService, AdoptionRequest } from '../../services/adoption.service';
import { SupportService, SupportRequest } from '../../services/support.service';
import { HttpClient } from '@angular/common/http';

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
  user: any;
  newResponse: { [key: string]: string } = {};
  errorMessage: string = '';

  constructor(
    private adoptionService: AdoptionService,
    private supportService: SupportService,
    private authService: AuthService,
    private http: HttpClient
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
    next: (data) => {
      // csak azok a kérelmek, ahol van állat és felhasználó is
      this.adoptionRequests = data.filter(r => r.animal && r.user);
    },
    error: (err) => this.errorMessage = err.error.message || 'Hiba történt a kérelmek lekérésekor.'
  });
}

fetchSupportRequests() {
  const token = localStorage.getItem('token');
  if (!token) return;

  this.supportService.getAllSupportRequests(token).subscribe({
    next: (data) => {
      // csak azok a support kérések, ahol van user
      this.supportRequests = data.filter(r => r.user);
    },
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

  sendResponse(requestId: string): void {
    const response = this.newResponse[requestId];
    if (!response) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    // 🔧 FONTOS: message objektumba ágyazzuk a szöveget
    this.supportService.addResponse(requestId, { text: response }, token).subscribe({
      next: () => {
        this.fetchSupportRequests(); // frissítjük a support kéréseket
        this.newResponse[requestId] = ''; // kiürítjük az inputot
      },
      error: (err) => console.error('Válasz küldése hiba:', err)
    });
  }
closeRequest(requestId: string) {
  const token = localStorage.getItem('token');
  if (!token) return;

  this.supportService.closeSupportRequest(requestId, token).subscribe({
    next: () => {
      console.log('Lezárva sikeresen');
      const request = this.supportRequests.find(r => r._id === requestId);
      if (request) {
        request.status = 'closed';
      }
    },
    error: (err) => {
      console.error('Hiba lezáráskor', err);
    }
  });
}
approveRequest(request: AdoptionRequest) {
  const token = localStorage.getItem('token');
  if (!token) return;

  if (!request.meetingDate) {
    alert('Kérlek, add meg a találkozó időpontját!');
    return;
  }

  this.adoptionService.updateAdoptionStatus(request._id, { 
    status: 'approved', 
    meetingDate: request.meetingDate 
  }, token).subscribe({
    next: () => {
      // helyben módosítjuk a request-et, hogy ne frissítsünk teljes listát
      request.status = 'approved';
      // meetingDate már a request.meetingDate, így nem kell újra beállítani
    },
    error: (err) => console.error('Jóváhagyás sikertelen:', err)
  });
}


rejectRequest(request: AdoptionRequest) {
  const token = localStorage.getItem('token');
  if (!token) return;

  // Elutasításkor státusz 'rejected', meetingDate változatlan
  this.adoptionService.updateAdoptionStatus(request._id, { 
    status: 'rejected' 
  }, token).subscribe({
    next: () => this.fetchAdoptionRequests(),
    error: (err) => console.error('Elutasítás sikertelen:', err)
  });
}


  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role === 'admin';
  }
  isOwnMessage(senderId: string): boolean {
    return this.user && this.user._id === senderId;
  }
}
