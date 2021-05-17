import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  addCarWindowIsVisible : boolean = false
  @Output() selected : EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  addCarOpen() : void {
    this.addCarWindowIsVisible = true
  }

  addCarClose(a : any) : void {
    this.addCarWindowIsVisible = false
  }

}
