import { Component, OnInit } from '@angular/core';

import { AlertService } from "../../../@com/alert/alert.service";

@Component({
  selector: 'app-test-b',
  templateUrl: './test-b.component.html',
  styleUrls: ['./test-b.component.scss']
})
export class TestBComponent implements OnInit {

  constructor(
    private alertService :AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.run('頁面呼叫alert');
  }

}
