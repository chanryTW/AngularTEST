import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms'; // 表單

import { AuthService } from "../../@base/auth/auth.service";
import { AlertService } from "../hint/alert/alert.service";

import { LoginSend } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('sendForm', { static: false }) public sendForm :NgForm;

  // 登入接口格式
	send = new LoginSend();

  constructor( 
    private router :Router,
    private authService :AuthService,
    private alertService :AlertService,
    private activatedRoute :ActivatedRoute // 路由
  ) { } 

  ngOnInit(): void { }

  /**
   * 登入
   */
  onSubmit(): void {
    // 如果表單驗證通過
    if (this.sendForm.form.valid) {
      // 送出 userData
      this.authService.login(
        this.sendForm.form.value
      ).subscribe( data => {
        // 如果登入成功
        if (data.ok) {
          // 導向home
          this.router.navigate(['/home']);
        } else {
          switch(data.code) { 
            case 103: { 
              this.alertService.run('登入失敗，密碼錯誤或帳號不存在');
              break; 
            } 
            case 104: { 
              this.alertService.run('登入失敗，必須傳入 Token');
              break; 
            } 
            case 105: { 
              this.alertService.run('登入失敗，無效的 Token');
              break; 
            } 
            default: { 
              this.alertService.run('登入失敗');
              break; 
            } 
         } 
        }
      })
    } else {
      this.alertService.run('請輸入正確帳號密碼');
    }
  }

}
