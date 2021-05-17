import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private dbPath = '/cars'

  carRef: AngularFirestoreCollection<Car> = null;

  constructor(private db: AngularFirestore) { 
    this.carRef = db.collection(this.dbPath)
  }

  getCarList() : AngularFirestoreCollection<Car> {
    return this.carRef;
  }
}
