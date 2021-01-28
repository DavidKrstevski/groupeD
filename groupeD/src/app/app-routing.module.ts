import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateGroupComponent } from './createGroup/create-group.component';
import { JoinGroupComponent } from './joinGroup/join-group.component';
import { QuickGroupComponent } from './quickGroup/quick-group.component';
import { IndexComponent } from './index/index.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createGroup', component: CreateGroupComponent },
  { path: 'joinGroup', component: JoinGroupComponent },
  { path: 'quickGroup', component: QuickGroupComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  AppComponent, 
  LoginComponent, 
  RegisterComponent,
  CreateGroupComponent,
  JoinGroupComponent,
  QuickGroupComponent,
  ErrorComponent
];
