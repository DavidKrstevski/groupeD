import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-profile.component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = "";

  constructor(private data: DataService) {
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(username => this.username = username)
  }
}
