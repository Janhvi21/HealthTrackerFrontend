import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  selectedMenu: string = 'Dashboard';

  constructor(
    public loginServiceService: LoginServiceService,
    public router: Router
  ) {}
  ngOnInit() {}
  ngAfterViewInit(): void {

  }
  public OnLogout(): void {
    this.loginServiceService.logout();
  }
  public onChangeMenu(menu): void {
    this.selectedMenu = menu;
  }
}
