import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollabService {

  url:string="https://localhost:7197/api/Collab";
  token:any;
  constructor(private httpService:HttpService) { 
    this.token=localStorage.getItem('token');
  }
  createCollab(noteId:string)
  {
    const header = {
      'Content-type': 'application/json',
      'Authorization': "Bearer " + this.token
    };
    return this.httpService.postService(`${this.url}/CollabCreate?noteId=${noteId}&EmailTo=sajanKumar@gmail.com`,{},true,{headers:header});
  }
}
