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

  changeCreateText($event: any) {
    this.createButton = $event.type == 'mouseover' ? 'CREATE A GROUP' : 'CREATE';
  }

  changeJoinText($event: any) {
    this.joinButton = $event.type == 'mouseover' ? 'JOIN A GROUP' : 'JOIN';
  }

  changeQuickText($event: any) {
    this.quickButton = $event.type == 'mouseover' ? 'CREATE TEMPORARY GROUP' : 'QUICK';
  }
  constructor() {}

  ngOnInit(): void {

  }

}
