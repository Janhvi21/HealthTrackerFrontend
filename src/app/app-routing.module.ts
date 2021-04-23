import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {UpdateprofileComponent} from './updateprofile/updateprofile.component';
import {ProfileviewComponent}from './profileview/profileview.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path:'sidebar',
    component:SidebarComponent
  },
  {
    path:'update',
    component:UpdateprofileComponent
  },
  {
    path:'profileview',
    component:ProfileviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
