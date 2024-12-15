import { Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Root component (usually for app-wide setup)
import { LoginComponent } from '../Components/UserComponents/login/login.component';

export const routes: Routes = [
    {
        path: '', component: AppComponent, pathMatch: 'full'  
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full' 
    }
];
