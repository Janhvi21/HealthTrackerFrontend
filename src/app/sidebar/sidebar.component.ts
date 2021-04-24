import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  selectedMenu: string = 'Dashboard';

  constructor(
    public loginServiceService: LoginServiceService,
    public router: Router,
    public dataService:DataserviceService
  ) {}
  ngOnInit() {
    this.dataService.getDataFromFirebase();
    this.dataService.getHealthDataFromFirebase();
  }
  ngAfterViewInit(): void {

  }
  public OnLogout(): void {
    this.loginServiceService.logout();
  }
  public onChangeMenu(menu:string): void {
    this.selectedMenu = menu;
  }
}
