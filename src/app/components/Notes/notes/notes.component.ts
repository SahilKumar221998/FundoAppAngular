import { NotesService } from './../../../service/Notes/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  @Input() notes: any[] = []; // Array to receive notes from parent
  @Input() activeItem='notes';
  @Output() archive = new EventEmitter<string>();
  @Output() trash = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() restore = new EventEmitter<string>();
  @Output() unarchive = new EventEmitter<string>();
  @Output() editNote = new EventEmitter<any>();
  @Output() createCollab = new EventEmitter<string>();
  @Input() viewMode: 'list' | 'grid' = 'list';
  isDropdownFixed: boolean = false;
  clickedNoteId: string | null = null;
  showIcons = false;
  hoveredNoteId: number | null = null; 

  colors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'];
  constructor(private matSnackBar:MatSnackBar,private notesService:NotesService ){
    console.log(this.activeItem);
  }
  ngOInit(){
   console.log(this.activeItem)

  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['activeItem']) {
  //     console.log('Active Item Changed:',this.activeItem);
  //   }
  // }

  handleColorSelected(noteId: string, color: string) {
    this.notesService.updateBackground(noteId, color).subscribe(
      (response: any) => {
        this.matSnackBar.open('Note color updated', '', { duration: 3000 });
        this.updateNoteColor(noteId, color);
        this.clickedNoteId = null;
      },
      (error: any) => {
        this.matSnackBar.open('Error updating note color', '', { duration: 3000 });
        this.clickedNoteId = null;
      }
    );
  }

  updateNoteColor(noteId: string, color: string) {
    const note = this.notes.find(n => n.noteId === noteId);
    if (note) {
      note.backgroundcolor = color;
    }
  }

  onCreateCollab(noteId: string) {
    this.createCollab.emit(noteId);
  }

  collapseForm() {
    this.showIcons = false;
  }
  setHoveredNoteId(noteId: number | null) {
    this.hoveredNoteId = noteId;
  }
  archiveNote(noteId: string) {
    console.log(noteId);
    this.archive.emit(noteId);
  }
  
  performNoteAction(noteId: string, trash: boolean) {
    if (trash) {
      this.delete.emit(noteId); // Call delete method
    } else {
      this.trash.emit(noteId); // Call trash method
    }
  }
  trashNote(noteId: string) {
    this.trash.emit(noteId);
  }
  restoreNote(noteId: string) {
    this.restore.emit(noteId);
  }
  deleteNote(noteId:string){
    this.delete.emit(noteId);
   }
  unarchiveNote(noteId: string) {
    this.unarchive.emit(noteId);
  }
  onNoteClick(note: any) {
    this.editNote.emit(note);
  }
  toggleNoteIcons(noteId: string) {
    this.clickedNoteId = this.clickedNoteId === noteId ? null : noteId;
  }

}