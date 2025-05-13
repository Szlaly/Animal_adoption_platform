import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule,CommonModule],  // RouterModule biztosítása
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Animal_Adopt_Proj';
  constructor(public authService: AuthService) {}
}
