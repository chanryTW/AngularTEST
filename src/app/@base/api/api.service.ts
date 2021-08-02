import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiData, ApiEcho, ApiSub } from './api';
import { environment } from 'src/environments/environment'; // 後端接口
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ApiService {
	constructor(private http: HttpClient) {}

	post(url: string, param?: object | null, callback?: ApiData) {
		// 置入後端接口格式、網址、參數、傳輸協定
		return this.http
			.post<ApiEcho>(environment.api + '/' + url, param ? param : {})
			.pipe(
				// 接口格式重新整理
				map((data) => {
					// 提供回調使用
					if (callback) {
						callback(data.Data, data.Code, data.Success);
					}

					// Subscribe訂閱 data
					const echo: ApiSub = {
						data: data.Data,
						code: data.Code,
						ok: data.Success,
					};

					return echo;
				})
			);
	}
}
