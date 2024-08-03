import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from './../../service/Notes/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activeItem: string = 'notes';
  isSidenavCollapsed = false;
  hasClicked = false;
  isExpanded = false;
  notesForm!: FormGroup;
  notes: any[] = [];
  filteredNotes: any[] = [];
  archivedNotes: any[] = [];
  trashedNotes: any[] = [];
  selectedNote: any;
  showEditor = false;
  viewMode: 'list' | 'grid' = 'list';
  searchControl = new FormControl(''); 
  selectedColor: string = '';

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.notesForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      Image: [''],
      Backgroundcolor: ['']
    });
   
    this.searchControl.valueChanges.subscribe(query => {
      this.filterNotes(query);
    });
    this.fetchNotes();
  }

  fetchNotes() {
    this.notesService.getAllNoteService().subscribe(
      (response: any) => {
        if (response.success && Array.isArray(response.data)) {
          // Update notes based on the activeItem
          this.notes = response.data.filter((note: any) => 
            this.activeItem == 'notes' && note.archieve ==false && note.trash == false ||
            this.activeItem == 'archive' && note.archieve == true && note.trash == false ||
            this.activeItem == 'trash' && note.trash == true && note.archieve == false
          );
          
          this.archivedNotes = response.data.filter((note: any) => note.archieve == true && note.trash ==false);
          this.trashedNotes = response.data.filter((note: any) => note.trash == true && note.archieve == false);
          
           // Log each note to verify Backgroundcolor
        this.filteredNotes = this.notes.map(note => {
          // console.log('Note Backgroundcolor:', note.backgroundcolor); // Log Backgroundcolor
          return {
            ...note,
            Backgroundcolor: note.Backgroundcolor || '#fff'
          };
        });
        } else {
          this.matSnackBar.open('Error fetching notes', '', { duration: 3000 });
        }
      },
      (error: any) => {
        console.log('Fetch Notes Error:', error);
        this.matSnackBar.open('Error fetching notes', '', { duration: 3000 });
      }
    );
  }

  expandForm() {
    this.isExpanded = true;
  }

  collapseForm() {
    this.isExpanded = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl("");
  }

  setActive(item: string) {
    this.activeItem = item;
    console.log('Active Item:', this.activeItem);
    console.log('Notes:', this.notes);
    this.fetchNotes();  
  }

  toggleSidenav() {
    if (this.hasClicked) {
      this.isSidenavCollapsed = !this.isSidenavCollapsed;
    } else {
      this.hasClicked = true;
    }
  }

  handleCollapse() {
    this.onSubmit();
  }

  onSubmit() {
    if (this.notesForm.invalid) {
      this.notesForm.markAllAsTouched();
      this.matSnackBar.open('Please fill out all required fields', '', { duration: 3000 });
      return;
    }

    let data = {
      title: this.notesForm.value.title,
      description: this.notesForm.value.description,
      Image: this.notesForm.value.Image,
      Backgroundcolor: this.selectedColor
    };

    this.notesService.createNotes(data).subscribe(
      (response: any) => {
        this.matSnackBar.open('Note created', '', { duration: 3000 });
        this.collapseForm();
        this.notesForm.reset();
        this.fetchNotes();
      },
      (error: any) => {
        this.matSnackBar.open('Error creating note', '', { duration: 3000 });
      }
    );
  }
  archiveNote(noteId: string) {
    this.notesService.archiveNoteService(noteId).subscribe(
    
      (response: any) => {
        this.matSnackBar.open('Note archived', '', { duration: 3000 });
        this.fetchNotes();
      },
      (error: any) => {
        this.matSnackBar.open('Error archiving note', '', { duration: 3000 });
      }
    );
  }
  
  deleteNote(noteId:string){
    console.log(noteId);
    this.notesService.deletenote(noteId).subscribe((response: any) => {
      this.matSnackBar.open('Note Deleted', '', { duration: 3000 });
      this.fetchNotes();
    },
    (error: any) => {
      this.matSnackBar.open('Error deleting note', '', { duration: 3000 });
    }
  );
   }
  trashNote(noteId: string) {
    this.notesService.trashNoteService(noteId).subscribe(
      (response: any) => {
        this.matSnackBar.open('Note trashed', '', { duration: 3000 });
        this.fetchNotes();
      },
      (error: any) => {
        this.matSnackBar.open('Error trashing note', '', { duration: 3000 });
      }
    );
  }
  unarchiveNote(noteId: string) {
    this.notesService.unArchieveNote(noteId).subscribe(
      (response: any) => {
        this.matSnackBar.open('Note unarchived', '', { duration: 3000 });
        this.fetchNotes();
      },
      (error: any) => {
        this.matSnackBar.open('Error unarchiving note', '', { duration: 3000 });
      }
    );
  }

  restoreNote(noteId: string) {
    this.notesService.restoreNote(noteId).subscribe(
      (response: any) => {
        this.matSnackBar.open('Note restored', '', { duration: 3000 });
        this.fetchNotes();
      },
      (error: any) => {
        this.matSnackBar.open('Error restoring note', '', { duration: 3000 });
      }
    );
  }
  openEditor(note: any) {
    this.selectedNote = note;
    this.showEditor = true;  // Controls visibility of the NoteEditor
  }

  handleSave(noteData: any) {
    console.log(noteData);
    if (!noteData.noteId) {
      this.matSnackBar.open('Note ID is missing', '', { duration: 3000 });
      return;
    }
  
    const updatedNote = {
      noteId: noteData.noteId, // Ensure note ID is included
      title: noteData.title,
      description: noteData.description||"", // Default to empty string if not provided
      image: noteData.image||"", // Default to empty string if not provide
      backgroundcolor:this.selectedColor
    };
    this.notesService.updateNotes(updatedNote).subscribe(
      response => {
        this.matSnackBar.open('Note updated successfully', '', { duration: 3000 });
        this.showEditor = false; // Hide the editor
        this.fetchNotes(); // Refresh the list to show updated data
      },
      error => {
        this.matSnackBar.open('Error updating note', '', { duration: 3000 });
      }
    );
  }
  
  handleClose() {
    this.handleCollapse();
    this.showEditor = false;  
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }

  filterNotes(query: string|null) {
    if (!query) {
      this.filteredNotes = [...this.notes];
    } else {
      const lowerCaseQuery = query.toLowerCase();
      this.filteredNotes = this.notes.filter(note =>
        note.title.toLowerCase().includes(lowerCaseQuery) ||
        note.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
  }
  handleColorSelected(color: string) {
    this.selectedColor = color;
    this.notesForm.get('backgroundcolor')?.setValue(color);
  }
}
