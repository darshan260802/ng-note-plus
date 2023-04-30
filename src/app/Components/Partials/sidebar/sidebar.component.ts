import { Component } from '@angular/core';
import { AuthService, SavedUser } from 'src/app/Shared/auth.service';
import {OnInit} from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user!:SavedUser; 

  constructor(private authService:AuthService){
    
  }

  ngOnInit(): void {
    this.authService.getUserStream().subscribe((user:SavedUser) => {
      this.user = {...user};
    })
  }

  userLogout():void{
    this.authService.logout();
  }

}
