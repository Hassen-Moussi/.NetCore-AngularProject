import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/Components/UserComponents/login/login.component';
import { HeaderComponent } from 'src/Components/HeaderFooter/header/header.component';
import { FooterComponent } from 'src/Components/HeaderFooter/footer/footer.component';
import { HomeComponent } from 'src/Components/home/home.component';
import { AuthGuard } from 'src/Components/UserComponents/guards/auth.guard';
import { AboutComponent } from 'src/Components/about/about.component';
import { ProfileComponent } from 'src/Components/UserComponents/profile/profile.component';
import { ContactComponent } from 'src/Components/contact/contact.component';

const routes: Routes = [{

  path:'home',component:HomeComponent
},
{
  path:'',component:LoginComponent, canActivate: [AuthGuard],
},
{
  path:'about' ,component:AboutComponent
},
{
  path:'profile',component:ProfileComponent
},
{
  path:'contact' , component : ContactComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
