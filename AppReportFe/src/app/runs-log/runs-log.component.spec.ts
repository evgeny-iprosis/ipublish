import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunsLogComponent } from './runs-log.component';

describe('RunsLogComponent', () => {
  let component: RunsLogComponent;
  let fixture: ComponentFixture<RunsLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunsLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
