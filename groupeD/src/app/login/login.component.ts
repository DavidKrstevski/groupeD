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

  constructor(
    private AuthService:AuthService,
    private router:Router,
    private _flashMessage:FlashMessagesService,
    ) { }

  ngOnInit(): void {
  }

  onLogin(myUsername: string, myPassword: string) {
    if (myUsername == "" && myPassword == "")
      return;

    if (myUsername === "" || myPassword === ""){
      this._flashMessage.show('One or two fields were empty')
      setTimeout(function() { window.location.reload()}, 1500)
      return;
    }

    const user = {
      username: myUsername,
      password: myPassword
    }

    this.AuthService.authenticateUser(user).subscribe(data => {
        if (data.body as any === false){
          this._flashMessage.show('Wrong Username or Password', {
          timeout: 1500});   
          setTimeout(function() { window.location.reload()}, 1500)
          return;
        }      
        this._flashMessage.show('Log in worked!')  
        this.AuthService.storeUserData((data as any).token, (data as any).user)
        this.router.navigate(['signedInIndex']);
    });
  }
}