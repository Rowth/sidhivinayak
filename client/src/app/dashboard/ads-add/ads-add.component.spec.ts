import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsAddComponent } from './ads-add.component';

describe('AdsAddComponent', () => {
  let component: AdsAddComponent;
  let fixture: ComponentFixture<AdsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



