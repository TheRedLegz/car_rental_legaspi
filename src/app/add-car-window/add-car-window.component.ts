import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscriber } from 'rxjs';
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
    // const n = Date.now() + 1;
    // const file = event.target.files[0];
    // const filePath = `carImages/`;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(`carImages/${n}`, file);
    
    // task.snapshotChanges().pipe().subscribe(url => {
    //   if (url) {
    //     console.log(url)
    //   }
    // })

    // task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       this.downloadURL = fileRef.getDownloadURL();
    //       this.downloadURL.subscribe(url => {
    //         if (url) {
    //           this.fb = url;
    //         }
    //         console.log(this.fb);
    //       });
    //     })
    //   )
    //   .subscribe(url => {
    //     if (url) {
    //       console.log(url);
    //     }
    //   });
  }

  closeWindowAction(): void {
    this.closeWindow.emit()
  }

  addCar(carName: string, rentPrice: string): void {
    const n = Date.now();
    const file = this.carImageEvent.target.files[0];
    const filePath = `carImages/`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`carImages/${n}`, file);
    
    task.snapshotChanges().pipe().subscribe(url => {
      if (url) {
        console.log(url)
      }
    })
    try {
      let tempRentPrice = parseFloat(rentPrice);
      this.store.collection("cars").add(
        new Car('a', carName, 'assets\\cars\\mitsubishi_lancer.jpg', tempRentPrice).toMap(),
      ).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
      this.closeWindow.emit()
    }
    catch (e) {
      console.log(e)
    }
  }

  addImage(a: any): void {
    console.log(a)
    this.selectedImage = a.target.files[0].name
  }
}
