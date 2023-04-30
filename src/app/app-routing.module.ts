import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Pages/login/login.component';
import { WorkspacesComponent } from './Components/Pages/workspaces/workspaces.component';
import { NotesComponent } from './Components/Pages/notes/notes.component';
import { TodosComponent } from './Components/Pages/todos/todos.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'workspaces'
  },
  {
    path:'auth',
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'login'
      },
      {
        path:'login',
        component: LoginComponent,
        data: {mode: 'login'}
      },
      {
        path:'signup',
        component: LoginComponent,
        data: {mode: 'signup'}
      },
    ]
  },
  {
    path:'workspaces',
    canActivate:[AuthGuard],
    component: WorkspacesComponent
  },
  {
    path:'notes',
    canActivate:[AuthGuard],
    component: NotesComponent
  },
  {
    path:'todos',
    canActivate:[AuthGuard],
    component: TodosComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
