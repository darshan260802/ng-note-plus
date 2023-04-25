import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Pages/login/login.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:''
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
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
