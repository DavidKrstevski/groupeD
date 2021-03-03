import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['../index/index.component.css', './join-group.component.css']
})
export class JoinGroupComponent implements OnInit {
  code = "";
  user = "";

  constructor(
    private AuthService:AuthService,
    private router:Router,
    private _flashMessage:FlashMessagesService
    ) { }

  ngOnInit(): void {
  }
  
  onJoinGroup(myCode: string) {
    if (!this.checkIfCodeIsValid(myCode))
    {
      console.log('Unvalid')
      this._flashMessage.show('Only 5 numbers are valid!')
      setTimeout(function() { window.location.reload()}, 1500)
      return;
    }
    this._flashMessage.show('Valid')
    //this.router.navigate(['signedInIndex']);
  }

  checkIfCodeIsValid(myCode: string) {
    if(myCode.length != 5)
      return false;

    //Check if Range is between number ascii values, 48 - 57
    console.log(myCode.charCodeAt(0))
    for (let i = 0; i < myCode.length; i++){
      if (myCode.charCodeAt(i) < 48 || myCode.charCodeAt(i) > 57)
        return false;
    }
    return true;
  }
}
