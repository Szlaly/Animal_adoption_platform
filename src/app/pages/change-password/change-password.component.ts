import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  private authService = inject(AuthService);

  form: FormGroup;
  message = '';
  error = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
  if (this.form.invalid) return;

  const token = localStorage.getItem('token');
  if (!token) {
    this.message = 'Nem vagy bejelentkezve.';
    this.error = true;
    return;
  }

  const { currentPassword, newPassword } = this.form.value;
  console.log('Form értékek:', this.form.value);
  
  // 🔁 Itt küldjük át oldPassword helyett currentPassword néven
  this.authService.changePassword(currentPassword, newPassword, token).subscribe({
    next: () => {
      this.message = 'Jelszó sikeresen megváltoztatva.';
      this.error = false;
      this.form.reset();
    },
    error: (err) => {
      this.message = err.error?.message || 'Hiba történt a jelszóváltoztatáskor.';
      this.error = true;
    }
  });
}


}
