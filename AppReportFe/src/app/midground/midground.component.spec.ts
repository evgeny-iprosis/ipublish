import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidgroundComponent } from './midground.component';

describe('MidgroundComponent', () => {
  let component: MidgroundComponent;
  let fixture: ComponentFixture<MidgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
