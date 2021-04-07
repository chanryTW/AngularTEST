import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from "../../@base/auth/auth.service";
import { AlertService } from "../../@com/alert/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public form!: FormGroup;

  constructor( 
    private router :Router,
    private fb :FormBuilder, // 用FormBuilder建立表格,
    private authService :AuthService,
    private alertService :AlertService,
    private activatedRoute :ActivatedRoute // 路由
  ) {
    this.createForm();
  } 

  ngOnInit(): void { }

  /**
   * 驗證
   */
  createForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required], // 預設值為''的formControl
      password: ['', Validators.required]
    })
  }

  /**
   * 登入
   */
  onSubmit(): void {
    // 檢查驗證
    if (this.form.valid) {
      // 送出 userData
      this.authService.login(
        this.form.value
      ).subscribe( data => {
        if (data.ok) {
          // 登入成功
          // 導向home
          console.log('導向home');
          this.router.navigate(['/home']);
        } else {
          this.alertService.run('登入失敗');
        }
      })
    } else {
      this.alertService.run('驗證失敗');
    }
  }

}
