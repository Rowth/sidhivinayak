import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureNewsComponent } from './nature-news.component';

describe('NatureNewsComponent', () => {
  let component: NatureNewsComponent;
  let fixture: ComponentFixture<NatureNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatureNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
