import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { LoginSend, UserData } from 'src/app/@page/login/login';
import { ApiService, ApiSub } from '../api/api';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	/** 使用者資料當前狀態 */
	private onlineSubject: BehaviorSubject<UserData>;

	// 使用者資料格式
	private userData: UserData;

	constructor(private apiService: ApiService) {
		// 使用者「加載狀態」控制函式
		this.onlineSubject = new BehaviorSubject<UserData>(this.userData);
	}

	/**
	 * 登入
	 */
	login(data: LoginSend): Observable<ApiSub> {
		const data2 = {
			Account: data.Account,
			PassWord: data.PassWord,
			LoginType: 0,
			Conn: 'CONN_PCD',
		};
		return this.apiService.post(
			'Login/LoginIn',
			data2,
			(user: UserData, code, ok) => {
				if (ok) {
					// 儲存使用者資料
					sessionStorage.setItem('userData', JSON.stringify(user));
					// 觀察者任務賦值
					this.onlineSubject.next(user);
				} else {
					// 取消觀察者任務
					// this.onlineSubject.next(null);
				}
			}
		);

		// 加密
		// return '已送出' + userData
		// 測試用api
		// npm install -g json-server
		// json-server --watch apiTest.json
	}

	/**
	 * 登出
	 */
	public logout() {
		sessionStorage.removeItem('userData');
	}
}
