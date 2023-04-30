import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { AuthService } from 'src/app/Shared/auth.service';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    TuiButtonModule
    
  ],
  exports:[SidebarComponent],
  providers:[AuthService]
})
export class PartialModule { }
