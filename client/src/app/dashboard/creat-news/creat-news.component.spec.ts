import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatNewsComponent } from './creat-news.component';

describe('CreatNewsComponent', () => {
  let component: CreatNewsComponent;
  let fixture: ComponentFixture<CreatNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
