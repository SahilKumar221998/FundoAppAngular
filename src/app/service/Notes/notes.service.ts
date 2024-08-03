import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  url:string="https://localhost:7197/api/Notes";
  token:any;
  constructor(private httpService:HttpService) {
    this.token=localStorage.getItem('token');
   }

  createNotes(data:any){
    console.log(localStorage.getItem('token'));
    console.log(this.token)
    const header={
      'Content-type':'application/json',
       'Authorization':"Bearer "+this.token
    }
    console.log("Request headers:", header);
    return this.httpService.postService(this.url+"/CreateNote",data,true,{headers:header});
  }

  getAllNoteService() {
    const header={
      'Content-type':'application/json',
       'Authorization':"Bearer "+this.token
    }
    return this.httpService.getService(this.url+"/RetriveAll", true,{headers:header});
    }
    
    archiveNoteService(noteId: string) {
      const header = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + this.token
      };
      return this.httpService.putService(`${this.url}/Archieve?noteId=${noteId}`, {}, true, { headers: header });
    }
  
    trashNoteService(noteId: string) {
      const header = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + this.token
      };
      return this.httpService.putService(`${this.url}/Trash?noteId=${noteId}`, {}, true, { headers: header });
    }
    changeColor(data: any) {
      const header = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + this.token
      };
      return this.httpService.putService(`${this.url}/Color?noteId=${data.noteId}&backgroundcolo=${data.color}`, data, true, header);
    }
    restoreNote(noteId: string){
      const header = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + this.token
      };
      return this.httpService.putService(`${this.url}/RestoreNote?noteId=${noteId}`, {}, true, { headers: header });
    }
    unArchieveNote(noteId: string){
      const header = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + this.token
      };
      return this.httpService.putService(`${this.url}/UnArchieve?noteId=${noteId}`, {}, true, { headers: header });
    }
    updateNotes(data: any) {
      const header = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + this.token
      };
      return this.httpService.putService(`${this.url}/updateNotes?noteId=${data.noteId}`, data, true,{ headers: header });
    }
    deletenote(noteId: string) {
      const header = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + this.token
      };
      return this.httpService.deleteService(`${this.url}/Delete?noteId=${noteId}`,{}, true,{headers: header });
    }

    updateBackground(noteId: string,color:string) {
      const header = {
        'Content-type': 'application/json',
        'Authorization': "Bearer " + this.token
      };
      return this.httpService.putService(`${this.url}/Color?noteId=${noteId}`,{}, true,{headers: header });
    }
}
