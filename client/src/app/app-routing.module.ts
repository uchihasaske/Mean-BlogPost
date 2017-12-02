import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { RegisterComponent } from './components/register/register.component'

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashbord', component: DashbordComponent },
  { path: 'register', component: RegisterComponent }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes) ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
