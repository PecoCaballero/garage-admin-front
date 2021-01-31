import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterCarComponent } from './register-car/register-car.component';
import { ListCarsComponent } from './list-cars/list-cars.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarsService } from './car.service';
import { CarComponent } from './car/car.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LicensePlatePipe } from './license-plate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterCarComponent,
    ListCarsComponent,
    CarComponent,
    RegisterUserComponent,
    LicensePlatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    CarsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
