import { NotesService } from './../../../service/Notes/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnChanges {
  @Input() notes: any[] = []; // Array to receive notes from parent
  @Input() activeItem:string='notes';
  @Output() archive = new EventEmitter<string>();
  @Output() trash = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() restore = new EventEmitter<string>();
  @Output() unarchive = new EventEmitter<string>();
  @Output() editNote = new EventEmitter<any>();
  @Input() viewMode: 'list' | 'grid' = 'list';
  isDropdownFixed: boolean = false;
  
  showIcons = false;
  hoveredNoteId: number | null = null; 
  constructor(private matSnackBar:MatSnackBar,private notesService:NotesService){
    console.log(this.activeItem);
  }
  ngOInit(){
   console.log(this.activeItem)

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['activeItem']) {
      console.log('Active Item Changed:',this.activeItem);
    }
  }

  handleColorSelected(note:any,color: string) {
    note.backgroundcolor = color;
    this.notesService.updateBackground(note.noteId,color).subscribe(
      (response: any) => {
        this.matSnackBar.open('Note color updated', '', { duration: 3000 });
      },
      (error: any) => {
        this.matSnackBar.open('Error updating note color', '', { duration: 3000 });
      }
    );
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
}