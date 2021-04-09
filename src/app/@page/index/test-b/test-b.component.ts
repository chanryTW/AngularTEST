import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from "../../hint/alert/alert.service";

@Component({
  selector: 'app-test-b',
  templateUrl: './test-b.component.html',
  styleUrls: ['./test-b.component.scss']
})
export class TestBComponent implements OnInit {

  constructor(
    private alertService :AlertService,
    private router :Router
  ) { }

  ngOnInit(): void {
    
  }

}
