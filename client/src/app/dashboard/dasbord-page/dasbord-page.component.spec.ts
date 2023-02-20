import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasbordPageComponent } from './dasbord-page.component';

describe('DasbordPageComponent', () => {
  let component: DasbordPageComponent;
  let fixture: ComponentFixture<DasbordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasbordPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasbordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
