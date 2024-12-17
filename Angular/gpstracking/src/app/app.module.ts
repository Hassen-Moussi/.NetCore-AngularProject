import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/Components/UserComponents/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/Components/HeaderFooter/header/header.component';
import { FooterComponent } from 'src/Components/HeaderFooter/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from 'src/Components/UserComponents/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
