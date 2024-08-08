import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string="https://localhost:7197/api/User";
  constructor(private httpService:HttpService) {
     

   }

   signUp(data:object){
    let headerConfig={
      headers:{
        'content-type':"application/json"
      }
   }
    return this.httpService.postService(this.url,data,false,headerConfig)
   }
   
   logIn(data:any){
    let headerConfig={
      headers:{
        'content-type':"application/json"
      }
    }
    return this.httpService.postService(this.url+"/UserLogin",data,false,headerConfig)
   }
   
   forgetPassword(email:string){
    let headerConfig={
      headers:{
        'content-type':"application/json"
      }
    }
    return this.httpService.postService(this.url+"/forgetPassword?email="+{email},{},false,headerConfig);
   }
}  
