import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { TuiDataListWrapperModule, TuiElasticContainerModule, TuiInputDateModule, TuiInputModule, TuiIslandModule, TuiSelectModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiDataListModule, TuiDialogModule, TuiScrollbarModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriorityDirective } from 'src/app/Shared/priority.directive';


@NgModule({
  declarations: [
    TodosComponent,PriorityDirective,
  ],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiButtonModule,
    TuiElasticContainerModule,
    TuiIslandModule,
    TuiDialogModule,
    TuiInputDateModule,
    TuiTextAreaModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiScrollbarModule,
    TuiInputDateModule,
    TuiDataListModule
  ],
  exports:[
    TodosComponent
  ]
})
export class TodosModule { }
