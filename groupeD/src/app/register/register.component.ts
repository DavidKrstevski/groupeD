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
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  onRegister(username: string, password: string, confirmPassword: string) {
    const user = {
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.AuthService.registerUser(user).subscribe(data => {
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
