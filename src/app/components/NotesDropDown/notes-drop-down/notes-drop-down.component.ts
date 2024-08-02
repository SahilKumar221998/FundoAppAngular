import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notes-drop-down',
  templateUrl: './notes-drop-down.component.html',
  styleUrls: ['./notes-drop-down.component.scss']
})
export class NotesDropDownComponent {
  @Output() deleteNote = new EventEmitter<void>();
  @Output() addLabel = new EventEmitter<void>();
  @Output() addDrawing = new EventEmitter<void>();
  @Output() makeCopy = new EventEmitter<void>();
  @Output() showCheckboxes = new EventEmitter<void>();
  @Output() copyToGoogleDocs = new EventEmitter<void>();
  @Output() versionHistory = new EventEmitter<void>();

  onDeleteNote() {
    this.deleteNote.emit();
  }

  onAddLabel() {
    this.addLabel.emit();
  }

  onAddDrawing() {
    this.addDrawing.emit();
  }

  onMakeCopy() {
    this.makeCopy.emit();
  }

  onShowCheckboxes() {
    this.showCheckboxes.emit();
  }

  onCopyToGoogleDocs() {
    this.copyToGoogleDocs.emit();
  }

  onVersionHistory() {
    this.versionHistory.emit();
  }
}
