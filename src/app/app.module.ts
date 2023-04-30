import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {HttpClientModule} from '@angular/common/http';
import { provideFirestore, getFirestore, Firestore } from '@angular/fire/firestore';
import { SidebarComponent } from './Components/Partials/sidebar/sidebar.component';
import { PartialModule } from './Components/Partials/partial.module';
import { LoginModule } from './Components/Pages/login/login.module';
import { WorkspacesModule } from './Components/Pages/workspaces/workspaces.module';
import { AuthService } from './Shared/auth.service';
import { WorkspaceService } from './Shared/workspace.service';
import { NotesModule } from './Components/Pages/notes/notes.module';
import { PriorityDirective } from './Shared/priority.directive';
import { TodosModule } from './Components/Pages/todos/todos.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    PartialModule,
    LoginModule,
    HttpClientModule,
    WorkspacesModule,
    NotesModule,
    TodosModule
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },AuthService, WorkspaceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
