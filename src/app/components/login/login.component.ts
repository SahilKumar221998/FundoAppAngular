import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/Users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  token:any;

  constructor(private fb: FormBuilder,private userService:UserService,private matSnackBar:MatSnackBar,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      ]]
    });
  }
  
  
  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    debugger
    this.submitted = true;
    let userdata={
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    this.userService.logIn(userdata).subscribe(
      (response:any)=>{
        console.log(response);
        localStorage.setItem("token",response.data);
        this.router.navigateByUrl("/dashboard");
      this.matSnackBar.open("Login SuccessFull",'',{duration:3000});
       
      },
      (error)=>{console.log(error);
        this.matSnackBar.open("Login UnsuccessFull",'',{duration:3000})
      }
    )
    
  
}
}