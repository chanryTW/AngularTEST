/**
 * 登入接口格式
 */
export class LoginSend {
	constructor(
		/** 帳號 */
		public Account: string = '',
		/** 密碼 */
		public PassWord: string = ''
	) {}
}

/**
 * 使用者個人資料
 */
export interface UserData {
	/** 公司資料庫 */
	Conn: string;
	/** 通行證 */
	Token: string;
}
