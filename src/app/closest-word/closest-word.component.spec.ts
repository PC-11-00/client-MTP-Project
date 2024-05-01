import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosestWordComponent } from './closest-word.component';

describe('ClosestWordComponent', () => {
  let component: ClosestWordComponent;
  let fixture: ComponentFixture<ClosestWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosestWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosestWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
