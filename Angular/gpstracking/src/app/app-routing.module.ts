import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/Components/UserComponents/login/login.component';
import { HeaderComponent } from 'src/Components/HeaderFooter/header/header.component';
import { FooterComponent } from 'src/Components/HeaderFooter/footer/footer.component';
import { HomeComponent } from 'src/Components/home/home.component';

const routes: Routes = [{

  path:'',component:HomeComponent
},
{
  path:'login',component:LoginComponent
},
{
  path:'header',component:HeaderComponent
},
{
  path:'footer',component:FooterComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
