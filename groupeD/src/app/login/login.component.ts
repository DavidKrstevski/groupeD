import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../index/index.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(
    private AuthService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  onLogin(username: string, password: string) {
    const user = {
      username: this.username,
      password: this.password
    }

    this.AuthService.authenticateUser(user).subscribe(data => {
      console.log(data)
        if ((data as any).success){
          this.AuthService.storeUserData((data as any).token, (data as any).user)
        } else {
          this.flashMessage.show('You are now logged in', {
            cssClass: 'alert-success', 
            timeout: 5000});       

          this.flashMessage.show((data as any).msg, {
            cssClass: 'alert-danger', 
            timeout: 5000});
        }
    });
  }
}