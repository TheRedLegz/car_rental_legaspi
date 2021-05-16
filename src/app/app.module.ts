import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AddCarWindowComponent } from './add-car-window/add-car-window.component';
import { CarCardComponent } from './car-card/car-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RentCarWindowComponent } from './rent-car-window/rent-car-window.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddCarWindowComponent,
    CarCardComponent,
    NavBarComponent,
    RentCarWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
