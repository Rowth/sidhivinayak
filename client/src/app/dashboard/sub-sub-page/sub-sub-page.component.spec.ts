import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubPageComponent } from './sub-sub-page.component';

describe('SubSubPageComponent', () => {
  let component: SubSubPageComponent;
  let fixture: ComponentFixture<SubSubPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSubPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSubPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
