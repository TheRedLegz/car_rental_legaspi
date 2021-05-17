import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rent-car-window',
  templateUrl: './rent-car-window.component.html',
  styleUrls: ['./rent-car-window.component.css']
})
export class RentCarWindowComponent implements OnInit {
  isVisible : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
