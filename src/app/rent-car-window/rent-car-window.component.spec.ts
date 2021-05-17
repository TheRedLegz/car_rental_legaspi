import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCarWindowComponent } from './rent-car-window.component';

describe('RentCarWindowComponent', () => {
  let component: RentCarWindowComponent;
  let fixture: ComponentFixture<RentCarWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentCarWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCarWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
