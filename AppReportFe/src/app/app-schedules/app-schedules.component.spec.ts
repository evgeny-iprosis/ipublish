import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSchedulesComponent } from './app-schedules.component';

describe('AppSchedulesComponent', () => {
  let component: AppSchedulesComponent;
  let fixture: ComponentFixture<AppSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
