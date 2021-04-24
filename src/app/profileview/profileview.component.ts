import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss'],
})
export class ProfileviewComponent implements OnInit {
  userInfo: any;
  @Input('selectedMenu') selectedMenu: string;
  @Output() changedMenu = new EventEmitter<string>();
  constructor(public dataServices: DataserviceService) {}
  ngOnInit(): void {
    this.userInfo = this.dataServices.userData;
  }

  async onSignUp() {}
  back() {
    this.selectedMenu = 'Dashboard';
    this.changedMenu.emit(this.selectedMenu);
  }
  update(){
    this.dataServices.updateUser();
    this.dataServices.updateUserHealthInfo();
    this.selectedMenu = 'Dashboard';
    this.changedMenu.emit(this.selectedMenu);
  }
}
