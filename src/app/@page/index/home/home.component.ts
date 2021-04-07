import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Route, Router } from '@angular/router';

import { AuthService } from "../../../@base/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  isLoggedIn :any;
  panelOpenState = false;
  // home子路由
  page: any;
  // 擁有權限之編號陣列（出參token, 入參auth）
  auth: string[] = ['A01','B01'];
  // nav列表
  navlist: any = []
  
  constructor(
    private router :Router,
    private _authService :AuthService
  ) {
    this.isLoggedIn = _authService.isLoggedIn();
  }

  ngOnInit(): void {
    // 檢查是否登入
    // if (this.isLoggedIn.source.value) {
    //   console.log("登入狀態");
    // } else {
    //   console.log("登出狀態");
    //   // 導向login
    //   this.router.navigate(['/login']);
    // }

    // 尋找home子路由
		this.page = this.router.config.find( item => {
			// 只取得路徑為空值（內頁）
			return item.path === 'home';
		});

    // 檢查權限
    // this.navlist = this.page.children.filter( (item:any) => {
    //   if (typeof item.data != 'undefined') {
    //     console.log(this.auth, item.data.AuthorityCode);
    //     item.title = item.data.Title;
    //     return this.auth.indexOf(item.data.AuthorityCode) >= 0
    //     // return item.path == 'testA'
    //   } else {
    //     console.log(item.children);
    //     return item.children.path == 'systemA'
    //   }
    // });
    // console.log(this.navlist);
    
    // 檢查權限 - 較笨方法
    this.page.children.forEach( (item:any) => {
      if (typeof item.data != 'undefined') {
        if (this.auth.indexOf(item.data.AuthorityCode) >= 0) {
          item.title = item.data.Title;
          this.navlist.push(item);
        }        
      } else {
        item.children.forEach( (item2:any) => {
          if (this.auth.indexOf(item2.data.AuthorityCode) >= 0) {
            item2.title = item2.data.Title;
            item2.path = item.path+'/'+item2.path;
            this.navlist.push(item2);
          }  
        });
      }
    });
  }

   /**
    * 登出
    */
   onSubmit(): void {
     console.log('登出');
     this._authService.logout();
     this.router.navigate(['/login']);
   }
  
}
