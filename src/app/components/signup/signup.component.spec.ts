import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SignupComponent } from './signup.component';
import { UserService } from 'src/app/service/Users/user.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatCardModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('first name field validity', () => {
    let firstName = component.signupForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    let errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    firstName.setValue("John");
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();

    firstName.setValue("John1");
    errors = firstName.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('last name field validity', () => {
    let lastName = component.signupForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    let errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    lastName.setValue("Doe");
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();

    lastName.setValue("Doe1");
    errors = lastName.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('email field validity', () => {
    let email = component.signupForm.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("test@test.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();

    email.setValue("test.com");
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });

  it('password field validity', () => {
    let password = component.signupForm.controls['password'];
    expect(password.valid).toBeFalsy();

    let errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("Password1!");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();

    password.setValue("pass");
    errors = password.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  
});
