import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRouterComponent } from './dash-router.component';

describe('DashRouterComponent', () => {
  let component: DashRouterComponent;
  let fixture: ComponentFixture<DashRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
