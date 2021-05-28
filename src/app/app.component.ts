import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Car } from './car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  carList : object[] = []
  carListFromFirebase = this.store.collection('cars').valueChanges().forEach((value) => {
    this.carList = []
    value.forEach((doc) => {
      this.carList.push(new Car(doc["key"], doc["carName"], doc["carImage"], doc["rentPrice"], doc["isAvailable"]))
    })
  });

  
  
  // carList : any = [
  //   new Car('a', 'Tesla', 'assets\\cars\\tesla.webp', 100),
  //   {
  //     key: 'a',
  //     carName : "Tesla",
  //     carImage: "assets\\cars\\tesla.webp",
  //     rentPrice : 100,
  //   },
  //   {
  //     key: 'b',
  //     carName : "Honda Civic",
  //     carImage: "assets\\cars\\honda_civic.jpg",
  //     rentPrice : 30,
  //   },
  //   {
  //     key: 'c',
  //     carName : "Mitsubishi Lancer",
  //     carImage: "assets\\cars\\mitsubishi_lancer.jpg",
  //     rentPrice : 50,
  //   },
  // ];

  constructor(private store : AngularFirestore) {}

  title = 'car-rental-final-build';
}
