import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	// 顯示訊息
	msg: string = '';

	// 是否顯示跳窗
	alertShow = new BehaviorSubject<boolean>(false);

	// 設定跳窗是否開啟
	set show(show: boolean) {
		this.alertShow.next(show);
	}

	// 跳窗是否開啟
	get show(): boolean {
		return this.alertShow.value;
	}

	constructor() {}

	run(msg: string): void {
		this.alertShow.next(true);
		this.msg = msg;
	}
}
