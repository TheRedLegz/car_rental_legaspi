import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscriber } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Car } from '../car';

@Component({
  selector: 'app-add-car-window',
  templateUrl: './add-car-window.component.html',
  styleUrls: ['./add-car-window.component.css']
})
export class AddCarWindowComponent implements OnInit {
  @Output() carInfo: EventEmitter<any> = new EventEmitter()
  @Output() closeWindow: EventEmitter<any> = new EventEmitter()
  selectedImage: any = null
  rentPrice: number | undefined
  carImageEvent : any

  constructor(private store: AngularFirestore, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.carImageEvent = event;
  }

  closeWindowAction(): void {
    this.closeWindow.emit()
  }

  addCar(carName: string, rentPrice: string): void {
    const n = Date.now();
    const file = this.carImageEvent.target.files[0];
    const filePath = `carImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`carImages/${n}`, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {

          let tempRentPrice = parseFloat(rentPrice);
          this.store.collection("cars").add(
            new Car(`${n}`, carName, url, tempRentPrice, true, 0).toMap(),
          ).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          }).catch((error) => {
            console.error("Error adding document: ", error);
          });
        });
      })
    ).subscribe();
    this.closeWindow.emit()
  }

  addImage(a: any): void {
    console.log(a)
    this.selectedImage = a.target.files[0].name
  }
}
