import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile.component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _flashMessagesService: FlashMessagesService) {}

  ngOnInit(): void {
    this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
  }

}
