import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
  gettoken(){
    return !!localStorage.getItem('token');
  }
}
