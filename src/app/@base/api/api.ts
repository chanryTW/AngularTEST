
export { ApiService } from './api.service';

/**
 * Api 回傳 格式
 */
export type ApiData = (
	data: any,
	code?: number,
	ok?: boolean
) => any;

/**
 * Api 訂閱 格式
 */
export interface ApiSub {
	data: any;
	code: number;
	ok: boolean;
}

// 後端回傳 格式
export interface ApiEcho {
	Data: any;
	Code: number;
	Success: boolean;
	Msg?: string;
}