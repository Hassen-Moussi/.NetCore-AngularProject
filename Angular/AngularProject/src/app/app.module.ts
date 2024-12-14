import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes = [
  { path: '', component: AppComponent },
];

@NgModule({
  declarations: [AppComponent],  // Declare AppComponent here
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],  // Bootstrap the AppComponent
})
export class AppModule {}
