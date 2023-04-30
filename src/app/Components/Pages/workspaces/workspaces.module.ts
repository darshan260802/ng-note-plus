import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspacesComponent } from './workspaces.component';
import {  TuiInputModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDialogModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import { TuiPaletteModule } from '@taiga-ui/addon-editor';



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
    TuiPaletteModule,
    TuiDialogModule

  ],exports:[
    WorkspacesComponent
  ],
  providers:[
  ]
})
export class WorkspacesModule { }
