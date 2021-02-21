import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorqComponent } from './editorq.component';

describe('EditorqComponent', () => {
  let component: EditorqComponent;
  let fixture: ComponentFixture<EditorqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
