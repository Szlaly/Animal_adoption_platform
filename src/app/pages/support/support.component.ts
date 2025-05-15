import { Component, OnInit } from '@angular/core';
import { SupportService, SupportRequest } from '../../services/support.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  supportRequests: SupportRequest[] = [];
  user: any;
  newMessages: { [key: string]: string } = {};

  subject: string = '';
  message: string = '';

  constructor(
    private supportService: SupportService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUser;
    this.fetchSupportRequests();
  }

  fetchSupportRequests() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.supportService.getUserSupportRequests(token).subscribe({
      next: (requests) => this.supportRequests = requests,
      error: (err) => console.error('Support lekérés hiba:', err)
    });
  }

  submitSupportRequest() {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!this.subject.trim() || !this.message.trim()) return;

    this.supportService.createSupportRequest(this.subject.trim(), this.message.trim(), token).subscribe({
      next: () => {
        this.subject = '';
        this.message = '';
        this.fetchSupportRequests();
      },
      error: (err) => console.error('Support kérés küldés hiba:', err)
    });
  }

  sendReply(requestId: string) {
  const token = localStorage.getItem('token');
  if (!token) return;

  const message = this.newMessages[requestId];
  if (!message || !message.trim()) return;

  console.log('Küldésre váró üzenet:', message);
  console.log('Request ID:', requestId);

  this.supportService.addReplyToSupportRequest(requestId, message.trim(), token).subscribe({
    next: (updatedRequest) => {
      console.log('Szerver válasza:', updatedRequest);
      
      const index = this.supportRequests.findIndex(r => r._id === updatedRequest._id);
      if (index !== -1) {
        this.supportRequests[index] = updatedRequest;
      }
      this.newMessages[requestId] = '';
    },
    error: (err) => console.error('Válasz küldés hiba:', err)
  });
}


  isOwnMessage(senderId: string): boolean {
    return this.user && this.user._id === senderId;
  }
}
