import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnChanges {
  @Input() notes: any[] = []; // Array to receive notes from parent
  @Output() archive = new EventEmitter<string>();
  @Output() trash = new EventEmitter<string>();

  showIcons = false;
  hoveredNoteId: number | null = null; 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notes']) {
      this.notes = changes['notes'].currentValue;
    }
  }

  handleColorSelected(color: string) {
    console.log('Color selected:', color);
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
}
