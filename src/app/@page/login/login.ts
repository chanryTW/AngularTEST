/**
 * 登入格式
 */
 export class LoginSend {
	constructor(
		/** 帳號 */
		public Account: string = '',
		/** 密碼 */
		public PassWord: string = '',
		/** 登入類型為固定值 ( WEB = 0, APP = 1 ) */
		public LoginType: number = 0,
		/** 公司資料庫 */
		public Conn: string = '',
		/** 單一入口登入 ( Single Sign-on ) */
		public SSO: string = ''
	) { }
}

/**
 * 使用者個人資料
 */
 export interface UserData {
	/** 公司資料庫 */
	Conn: string;
	/** 通行證 */
	Token: string;
	/** LINE 帳號連結設定 (0:不需要連結 1:需要連結) */
	LineBindingFlg?: 0 | 1;
}