import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnimalListComponent } from './pages/animal-list/animal-list.component';
import { AnimalDetailComponent } from './pages/animal-detail/animal-detail.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SupportComponent } from './pages/support/support.component';
import { AddAnimalComponent } from './pages/add-animal/add-animal.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'animals', component: AnimalListComponent },
  { path: 'animals/new', component: AddAnimalComponent },
  { path: 'animals/:id', component: AnimalDetailComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'support', component: SupportComponent },
  { path: 'admin', component: AdminDashboardComponent },
];
