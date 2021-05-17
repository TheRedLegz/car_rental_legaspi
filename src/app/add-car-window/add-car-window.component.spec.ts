import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarWindowComponent } from './add-car-window.component';

describe('AddCarWindowComponent', () => {
  let component: AddCarWindowComponent;
  let fixture: ComponentFixture<AddCarWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
