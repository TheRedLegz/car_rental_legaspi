import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, tap } from 'rxjs/operators';
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
  @Input() starRating: number | undefined
  dateRented: Date | undefined
  dateToReturn: Date | undefined
  datePipe: DatePipe | undefined

  constructor(private store: AngularFirestore, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  getChunkedReview() : void {
    let chunkJSON : any;
    this.store.collection("cars").ref.where("key", "==", this.key).get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No data found")
      }
      else {
        querySnapshot.forEach(async (doc) => {
          let reviews :string[] = doc.data()["reviews"]
          
          console.log(reviews)
          if (reviews == undefined) {
            reviews = []
          }

          reviews.forEach(async (review) => {
            console.log(review)
            chunkJSON = await this.httpClient.get('http://127.0.0.1:5002/chunking/np/' + review).toPromise() as JSON
          })
        })
      }
    })
  }

  review(): void {
    let sentiment = prompt("Write a short review about the car")
    let sentimentJSON: any;
    if (sentiment != null) {
      alert(sentiment)
      this.store.collection("cars").ref.where("key", "==", this.key).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No data found")
        }
        else {
          querySnapshot.forEach(async (doc) => {
            let reviews :string[] = []
            let positiveRevs: number = doc.data()["positiveReviewCount"]
            let negativeRevs: number = doc.data()["negativeReviewCount"]

            if (positiveRevs == undefined) {
              positiveRevs = 0
            }
            if (negativeRevs == undefined) {
              negativeRevs = 0
            }
            reviews = doc.data()["reviews"]
            let starRating: number = 0
            
            if (reviews == undefined) {
              reviews = []
            }

            reviews.push(sentiment)
            sentimentJSON = await this.httpClient.get('http://127.0.0.1:5002/sentiment-analysis/' + sentiment).toPromise() as JSON

            if (sentimentJSON["sentiment"] == "Positive") {
              this.store.collection("cars").doc(doc.id).update({reviews: reviews, positiveReviewCount: positiveRevs + 1, negativeReviewCount: negativeRevs, starRating: (positiveRevs + 1) / (positiveRevs + negativeRevs + 1)})
            }
            else if (sentimentJSON["sentiment"] == "Negative") {
              this.store.collection("cars").doc(doc.id).update({reviews: reviews, positiveReviewCount: positiveRevs, negativeReviewCount: negativeRevs + 1, starRating: positiveRevs / (positiveRevs + negativeRevs + 1)})
            }
          })
        }
      })
    }
  }

  rent(): void {
    if (!this.isAvailable) {
      alert("Car successfully returned!")
      this.store.collection("cars").ref.where("key", "==", this.key).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No data found")
        }
        else {
          querySnapshot.forEach((doc) => {
            this.store.collection("cars").doc(doc.id).update({isAvailable: !this.isAvailable})
            this.review()
          })
        }
      })
    }
    else {
      let x = prompt("How many days would you like to rent this car?")
      if (x) {
        if (isNaN(+x)) {
          alert("ERROR! You must input a number")
        }
        else {
          this.store.collection("cars").ref.where("key", "==", this.key).get().then((querySnapshot) => {
            if (querySnapshot.empty) {
              console.log("No data found")
            }
            else {
              querySnapshot.forEach((doc) => {
                this.store.collection("cars").doc(doc.id).update({isAvailable: !this.isAvailable})
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
