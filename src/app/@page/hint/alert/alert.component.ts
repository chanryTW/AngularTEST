import { Component, OnInit } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
	constructor(public alertService: AlertService) {}

	ngOnInit(): void {}

	/**
	 * 確認
	 */
	ok(): void {
		// 關閉alert
		this.alertService.show = false;
	}

	/**
	 * 關閉
	 */
	cancel(): void {
		// 關閉alert
		this.alertService.show = false;
	}
}
