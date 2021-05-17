import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // carList : any = [
  //   {
  //     carName : "Tesla",
  //     carImage: "assets\\cars\\tesla.webp",
  //     rentPrice : 100,
  //   },
  //   {
  //     carName : "Honda Civic",
  //     carImage: "assets\\cars\\honda_civic.jpg",
  //     rentPrice : 30,
  //   },
  //   {
  //     carName : "Mitsubishi Lancer",
  //     carImage: "assets\\cars\\mitsubishi_lancer.jpg",
  //     rentPrice : 50,
  //   },
  // ];

  @Input() carList : any
  constructor() { }

  ngOnInit(): void {
  }

  testFunction() : void {
    alert("TEST")
  }

  showAddCarWindow(a : any) : void {
    if (a) {
      alert("true")
    }
    else {
      alert("false")
    }
  }
}
