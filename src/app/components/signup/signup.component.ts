import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/Users/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder,private userService:UserService,private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword) {
      return password.value === confirmPassword.value ? null : { mismatch: true };
    }
    return null;
  }
   
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  // Convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted=true;
    console.log("Form Submitted");
    console.log("Form Valid:", this.signupForm.valid);
    let userData={
      firstName:this.signupForm.value.firstName,
      lastName:this.signupForm.value.lastName,
      email:this.signupForm.value.email,
      password:this.signupForm.value.password
    }
    if(this.signupForm.valid){
    this.userService.signUp(userData).subscribe(
      (response:any)=>{
        console.log(response);
        this.snackbar.open("Registration Successfull",'',{duration:3000});
      },
      (error)=>
      {
        console.log(error);
        this.snackbar.open("Registration Unsuccessfull",'',{duration:3000});
      }
    )
    
  }
 }
}