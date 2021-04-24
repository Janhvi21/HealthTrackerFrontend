import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss'],
})
export class ProfileviewComponent implements OnInit {
  @Input('selectedMenu') selectedMenu: string;
  @Output() changedMenu = new EventEmitter<string>();
  constructor() {}
  ngOnInit(): void {}

  async onSignUp() {}
  back() {
    this.selectedMenu = 'Dashboard';
    this.changedMenu.emit(this.selectedMenu);
  }
}
