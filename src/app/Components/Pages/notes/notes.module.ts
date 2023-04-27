import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDataListWrapperModule, TuiInputModule, TuiIslandModule, TuiSelectModule, TuiSelectOptionModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule, TuiScrollbarModule } from '@taiga-ui/core';
import { WorkspaceService } from 'src/app/Shared/workspace.service';
import { NoteService } from 'src/app/Shared/note.service';



@NgModule({
  declarations: [
    NotesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiIslandModule,
    TuiScrollbarModule
  ],
  exports:[
    NotesComponent
  ],
  providers:[WorkspaceService, NoteService]
})
export class NotesModule { }
