import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { RegisterCarComponent } from './register-car/register-car.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { path: 'list-cars', component: ListCarsComponent },
  { path: 'register-car', component: RegisterCarComponent },
  { path: 'edit-car/:id', component: RegisterCarComponent },
  { path: 'register-user', component: RegisterUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
