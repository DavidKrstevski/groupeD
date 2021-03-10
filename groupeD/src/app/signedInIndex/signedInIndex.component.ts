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
  createButton = "CREATE"
  joinButton = "JOIN"
  quickButton = "QUICK"

  constructor(
    private AuthService:AuthService,
    private router:Router,
    private _flashMessage:FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  changeCreateText($event: any) {
    this.createButton = $event.type == 'mouseover' ? 'CREATE A GROUP' : 'CREATE';
  }

  changeJoinText($event: any) {
    this.joinButton = $event.type == 'mouseover' ? 'JOIN A GROUP' : 'JOIN';
  }

  changeQuickText($event: any) {
    this.quickButton = $event.type == 'mouseover' ? 'CREATE TEMPORARY GROUP' : 'QUICK'; //TODO: CHRISTOPHE: set fontsize smaller 
  }

  onLogout() {
    this.AuthService.logout();
    this._flashMessage.show("You are logged out", { timeout: 5000 });
    this.router.navigate(['home']);
    return false;
  }
}
