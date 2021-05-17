import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-car-window',
  templateUrl: './add-car-window.component.html',
  styleUrls: ['./add-car-window.component.css']
})
export class AddCarWindowComponent implements OnInit {
  @Output() carInfo : EventEmitter<any> = new EventEmitter()
  @Output() closeWindow : EventEmitter<any> = new EventEmitter()
  selectedImage : any = null
  rentPrice : number | undefined

  constructor(private store : AngularFirestore) {}

  ngOnInit(): void {
  }

  closeWindowAction() : void {
    this.closeWindow.emit()
  }

  addCar() : void {
    alert("Car added!")
  }

  addImage(a : any) : void {
    console.log(a)
    this.selectedImage = a.target.files[0].name
  }
}
