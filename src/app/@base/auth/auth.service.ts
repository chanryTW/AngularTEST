import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from "rxjs";
import { ApiService, ApiSub } from "../api/api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoginSubject = new BehaviorSubject<boolean>(this.hasLogin());
    private loginUrl = "http://localhost:3000/login";
    
    constructor(
      private apiService: ApiService,
    ) { }
    
    // 檢查是否有使用者資料
    public hasLogin() : boolean {
      return !!sessionStorage.getItem('userData');
    }

    /**
     * 登入
     */
    login( data :any ) :Observable<ApiSub> {
      return this.apiService.post(
        'login',
        // data,
        ( user :any, code :number, ok :boolean ) => {
          // 如果登入成功
          if ( ok ) {
            console.log(ok);
            return user
            // 儲存使用者資料
            sessionStorage.setItem('userData', JSON.stringify(user));
            // 初始化基本資料
            // this.base.init(this.refine(user));
            // 觀察者任務賦值
            // this.onlineSubject.next(user);
            this.isLoginSubject.next(true);
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
    public logout(){
      sessionStorage.removeItem('userData');
      this.isLoginSubject.next(false);
    }   
    
    /**
     * 判斷登入
     * @returns 
     */
    public isLoggedIn() : Observable<boolean> {
      return this.isLoginSubject.asObservable();
    }

    
}
