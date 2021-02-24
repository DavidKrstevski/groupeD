import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  username = "";
  password = "";
  confirmPassword = "";

  constructor(
    private AuthService:AuthService,
    private router:Router,
    private _flashMessage:FlashMessagesService
    ) { }

  ngOnInit(): void {
    
  }

  async onRegister(myUsername: string, myPassword: string, myConfirmPassword: string) {
    if (myUsername === "" || myConfirmPassword === "" || myPassword === ""){
      this._flashMessage.show('No inputs given')
      setTimeout(function() { window.location.reload()}, 1500)
      return;
    }

    if (myPassword !== myConfirmPassword)
    {
      this._flashMessage.show('Your passwords are not the same')
      setTimeout(function() { window.location.reload()}, 1500)
      return;
    }

    if (myPassword.length < 7)
    {
      this._flashMessage.show('Your password is too short')
      setTimeout(function() { window.location.reload()}, 1500)
      return;
    }

    if (myUsername.length < 2)
    {
      this._flashMessage.show('Your username is too short')
      setTimeout(function() { window.location.reload()}, 1500)
      return;
    }

    const user = {
      username: myUsername,
      password: myPassword,
      confirmPassword: myConfirmPassword
    };
   
    this.AuthService.registerUser(user).subscribe(data => {
      if (data as any === false){
        this._flashMessage.show('Register failed, try again')
        setTimeout(function() { window.location.reload()}, 1500)
      return;
      }
      
      this.AuthService.storeUserData((data as any).token, (data as any).user)
      this.router.navigate(['login']);
    });
  }
}