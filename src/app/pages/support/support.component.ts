import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportService, SupportRequest } from '../../services/support.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  user: any;
  favorites: any[] = [];
  adoptionRequests: any[] = [];
  subject: string = '';
  message: string = '';
  userSupportRequests: SupportRequest[] = [];

  constructor(
    private supportService: SupportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.loadMySupportRequests();
  }

  submitSupportRequest() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.supportService.createSupportRequest(this.subject, this.message, token).subscribe({
      next: () => {
        this.subject = '';
        this.message = '';
        this.loadMySupportRequests();
      },
      error: (err) => console.error('Kérés sikertelen:', err)
    });
  }

  loadMySupportRequests() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.supportService.getUserSupportRequests(token).subscribe({
      next: (data) => this.userSupportRequests = data,
      error: (err) => console.error('Hiba a saját support kérdések betöltésekor:', err)
    });
  }
}
