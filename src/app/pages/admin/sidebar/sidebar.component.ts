import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isLoggedIn = false;
  user:any = null;

  constructor(public login:LoginService) { }

  ngOnInit(): void {
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
