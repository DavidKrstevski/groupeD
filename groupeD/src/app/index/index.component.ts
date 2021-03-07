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
      this.createButton = 'CREATE A GROUP'
      this.font = 12;
      return
    }
    this.createButton = 'CREATE'
      this.font = 20;
  }

  changeJoinText($event: any) {
    this.joinButton = $event.type == 'mouseover' ? 'JOIN A GROUP' : 'JOIN';
  }

  changeQuickText($event: any) {
    this.quickButton = $event.type == 'mouseover' ? 'CREATE TEMPORARY GROUP' : 'QUICK'; //TODO: CHRISTOPHE: set fontsize smaller 
  }
  constructor() {}

  ngOnInit(): void {

  }

}
