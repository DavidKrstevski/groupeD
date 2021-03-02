import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  createButton = "CREATE"
  joinButton = "JOIN"
  quickButton = "QUICK"

  font = 11;

  changeCreateText($event: any) {
    if ($event.type == 'mouseover'){
      this.createButton = 'This creates a group'
      this.font = 12;
      return
    }
    this.createButton = 'CREATE'
      this.font = 20;
  }

  changeJoinText($event: any) {
    this.joinButton = $event.type == 'mouseover' ? 'This joins a group' : 'JOIN';
  }

  changeQuickText($event: any) {
    this.quickButton = $event.type == 'mouseover' ? 'This joins a group quickly' : 'QUICK';
  }
  constructor() {}

  ngOnInit(): void {

  }

}
