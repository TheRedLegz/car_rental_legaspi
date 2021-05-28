import { DatePipe } from '@angular/common';
import { Component, Input, Output, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Car } from '../car';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() carName: string | undefined
  @Input() rentPrice: number | undefined
  @Input() carImage: string | undefined
  @Input() isAvailable: boolean | undefined
  @Input() key: string | undefined
  dateRented: Date | undefined
  dateToReturn: Date | undefined
  datePipe: DatePipe | undefined

  constructor(private store: AngularFirestore) { }

  ngOnInit(): void {
  }

  rent(): void {
    if (!this.isAvailable) {
      alert("Car successfully returned!")
      this.isAvailable = !this.isAvailable;
    }
    else {
      let x = prompt("How many days would you like to rent this car?")
      if (x) {
        if (isNaN(+x)) {
          alert("ERROR! You must input a number")
        }
        else {

          this.store.collection("cars").ref.where("key", "==", this.key).get().then((querySnapshot) => {
            console.log(querySnapshot.empty)
            
            if (querySnapshot.empty) {
              console.log("No data found")
            }
            else {
              querySnapshot.forEach((doc) => {
                this.store.collection("cars").doc(doc.id).update(new Car(this.key, this.carName, this.carImage, this.rentPrice, !this.isAvailable).toMap())
              })
            }
          })
          alert(`Car has been rented for $${+x * this.rentPrice!} for ${x} days!`)
          this.dateRented = new Date()
          this.dateToReturn = new Date()
          this.dateToReturn.setDate(this.dateToReturn.getDate() + +x)
        }
      }
    }
  }
}
