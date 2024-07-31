import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorlensiconComponent } from './colorlensicon.component';

describe('ColorlensiconComponent', () => {
  let component: ColorlensiconComponent;
  let fixture: ComponentFixture<ColorlensiconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorlensiconComponent]
    });
    fixture = TestBed.createComponent(ColorlensiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
