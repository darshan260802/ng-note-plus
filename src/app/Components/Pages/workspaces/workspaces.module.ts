import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspacesComponent } from './workspaces.component';
import { TuiDataListWrapperModule, TuiInputModule, TuiSelectModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import { TuiPaletteModule } from '@taiga-ui/addon-editor';
import { WorkspaceService } from 'src/app/Shared/workspace.service';
import { AuthService } from 'src/app/Shared/auth.service';



@NgModule({
  declarations: [
    WorkspacesComponent
  ],
  imports: [
    CommonModule,
    TuiInputModule,
    FormsModule,
    ReactiveFormsModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
    TuiPaletteModule

  ],exports:[
    WorkspacesComponent
  ],
  providers:[
  ]
})
export class WorkspacesModule { }
