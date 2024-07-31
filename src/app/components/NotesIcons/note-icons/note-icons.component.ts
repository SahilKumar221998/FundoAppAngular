import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from './../../../service/Notes/notes.service';
import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-note-icons',
  templateUrl: './note-icons.component.html',
  styleUrls: ['./note-icons.component.scss']
})
export class NoteIconsComponent {
  notesForm!: FormGroup;
  @Output() collapse=new EventEmitter<void>();
  isColorLensVisible = false;
  token:any;

constructor(private formBuilder: FormBuilder,private notesService:NotesService,private matSnackBar:MatSnackBar){

}

ngOnInit() {
  this.notesForm = this.formBuilder.group({
    title: [''],
    description: ['']
  });
}
  collapseForm() {
    this.collapse.emit();
  }
  handleColorSelected(color: string) {
    console.log('Selected color:', color);
  }

}
