import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDropDownComponent } from './notes-drop-down.component';

describe('NotesDropDownComponent', () => {
  let component: NotesDropDownComponent;
  let fixture: ComponentFixture<NotesDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesDropDownComponent]
    });
    fixture = TestBed.createComponent(NotesDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
