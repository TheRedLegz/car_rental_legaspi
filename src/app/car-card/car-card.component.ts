import { DatePipe } from '@angular/common';
import { Component, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input() carName : string | undefined
  @Input() rentPrice : number | undefined
  @Input() carImage : string | undefined
  @Input() isRented : boolean | undefined
  dateRented : Date | undefined
  dateToReturn : Date | undefined
  datePipe: DatePipe | undefined

  constructor() { }

  ngOnInit(): void {
  }

  rent() :void {
    if (this.isRented) {
      alert("Car successfully returned!")
      this.isRented = !this.isRented;
    }
    else {
      let x = prompt("How many days would you like to rent this car?")
      if (x) {
        if (isNaN(+x)) {
          alert("ERROR! You must input a number")
        }
        else {
          alert(`Car has been rented for $${+x * this.rentPrice!} for ${x} days!`)
          this.dateRented = new Date()
          this.dateToReturn = new Date()
          this.dateToReturn.setDate(this.dateToReturn.getDate() + +x)
          this.isRented = !this.isRented;
        }
      }
    }
  }
}
