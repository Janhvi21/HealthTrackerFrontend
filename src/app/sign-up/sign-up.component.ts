import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userInfo={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    gender:"",
    age:"",
    height:"",
    weight:"",
    uid:""
  }
  constructor(public loginServiceService: LoginServiceService) {}

  ngOnInit(): void {}

  async onSignUp(userInfo:any) {
    const userName = userInfo.firstName + userInfo.lastName;
    await this.loginServiceService.signup(userInfo);
  }
}
