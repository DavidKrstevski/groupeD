import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signedInIndex',
  templateUrl: './signedInIndex.component.html',
  styleUrls: ['./signedInIndex.component.css']
})
export class SignedInIndexComponent implements OnInit {

  constructor(
    private AuthService:AuthService,
    private router:Router,
    private _flashMessage:FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.AuthService.logout();
    this._flashMessage.show("You are logged out", { timeout: 5000 });
    this.router.navigate(['home']);
    return false;
  }
}
