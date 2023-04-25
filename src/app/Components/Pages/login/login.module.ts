import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TuiCheckboxBlockModule, TuiElasticContainerModule, TuiInputModule, TuiInputPasswordModule, TuiIslandModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';
import { AuthService } from 'src/app/Shared/auth.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    TuiElasticContainerModule,
    FormsModule,
    ReactiveFormsModule,
    TuiIslandModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiCheckboxBlockModule,
    TuiLinkModule,
    TuiButtonModule
  ],
  exports:[
    LoginComponent
  ],
  providers:[
    AuthService
  ]
})
export class LoginModule { }
