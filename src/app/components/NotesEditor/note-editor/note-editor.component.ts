import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from './../../../service/Notes/notes.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent {
  @Input() note: any;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  
  constructor(private notesService:NotesService,private matSnackBar:MatSnackBar){}
  handleClose() {
    this.save.emit(this.note); // Emit save event with note data
    this.close.emit(); // Emit close event
  }

  saveNote() {
    this.save.emit(this.note); // Emit save event with note data
  }
}
