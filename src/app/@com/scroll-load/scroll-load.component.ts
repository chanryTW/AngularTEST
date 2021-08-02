import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-scroll-load',
	templateUrl: './scroll-load.component.html',
	styleUrls: ['./scroll-load.component.scss'],
})
export class ScrollLoadComponent implements OnInit {
	@ViewChild('listEnd') private listEnd: ElementRef;

	/** 滾動觀察者 */
	private observer: IntersectionObserver;

	/** 外部獲取之被觀察對象 */
	public scrollLoad$ = new Subject();

	/** 欲載入頁數 */
	public page: Number = 2;

	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit() {
		/**
		 * Intersection Observer API 滾動到最底部時呼叫
		 */
		// 建立觀察者
		this.observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// 如果進入 viewport
						// 執行廣播
						this.scrollLoad$.next(this.page);
						// 準備下次載入頁數
						this.page = Number(this.page) + 1;
					}
				});
			},
			{ threshold: 0 } // option 設定臨界值0
		);
		// 觀察哪個元素
		this.observer.observe(this.listEnd.nativeElement);
	}

	ngOnDestroy(): void {
		// 如果已離開 或 到最後一筆
		// 清除訂閱
		this.observer.unobserve(this.listEnd.nativeElement);
	}
}
