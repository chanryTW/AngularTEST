import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../hint/alert/alert.service';

@Component({
	selector: 'app-test-b',
	templateUrl: './test-b.component.html',
	styleUrls: ['./test-b.component.scss'],
})
export class TestBComponent implements OnInit {
	@ViewChild('scrollLoad') scrollLoad: any;

	// 觀察滾動執行
	private scrollLoadSubscription: any;

	// 產生測試item
	items = Array(10);

	constructor(private alertService: AlertService, private router: Router) {}

	ngOnInit(): void {}

	ngAfterViewInit() {
		// 加入觀察者並訂閱
		this.scrollLoadSubscription = this.scrollLoad.scrollLoad$.subscribe(
			(page: Number) => {
				console.log('執行載入api第' + page + '頁');
				// 模擬寫進資料
				for (let i = 1; i <= 10; i++) {
					this.items.push([]);
				}
			}
		);
	}

	ngOnDestroy(): void {
		// 清除訂閱
		this.scrollLoadSubscription.unsubscribe();
	}
}
