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

  onRegister(myUsername: string, myPassword: string, myConfirmPassword: string) {
    if (myPassword !== myConfirmPassword)
    {
      this._flashMessage.show('Your passwords are not the same', 
      { cssClass: 'alert' });
      this.router.navigate(['./register']);
      setTimeout(function() { window.location.reload()}, 1500)
      return;
    }

    if (myPassword.length < 7)
    {
      this._flashMessage.show('Your password is too short', 
      { cssClass: 'alert', timeout: 5000 });
      this.router.navigate(["./register"]);
      setTimeout(function() { window.location.reload()}, 1500)
      return;
    }

    if (myUsername.length < 2)
    {
      this._flashMessage.show('Your username is too short', 
      { cssClass: 'alert', timeout: 5000 });
      this.router.navigate(["./register"]);
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
        this._flashMessage.show('Register failed, try again', 
        { cssClass: 'alert-success', timeout: 1000 })
        this.router.navigate(['register']);
      }
      
      this.AuthService.storeUserData((data as any).token, (data as any).user)
      this.router.navigate(['login']);
    });
  }
}