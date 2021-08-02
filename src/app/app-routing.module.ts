import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './@page/login/login.component';
import { RegisterComponent } from './@page/index/register/register.component';
import { HomeComponent } from './@page/index/home/home.component';
import { TestAComponent } from './@page/index/test-a/test-a.component';
import { TestBComponent } from './@page/index/test-b/test-b.component';
import { SystemAComponent } from './@page/index/system/system-a/system-a.component';
import { SystemBComponent } from './@page/index/system/system-b/system-b.component';

import { PageGuard } from './@page/page.guard';

// 路由
const routes: Routes = [
	// 登入頁
	{ path: 'login', component: LoginComponent },
	// 註冊頁
	{ path: 'register', component: RegisterComponent },
	// 首頁
	{
		path: 'home',
		component: HomeComponent,
		canActivateChild: [PageGuard],
		children: [
			// 測試頁A
			{
				path: 'testA',
				component: TestAComponent,
				data: {
					AuthorityCode: 'A01',
					Title: '測試頁A',
				},
			},
			// 測試頁B
			{
				path: 'testB',
				component: TestBComponent,
				data: {
					AuthorityCode: 'B01',
					Title: '測試頁B',
				},
			},
			// 系統測試頁
			{
				path: 'system',
				children: [
					// 系統測試頁A
					{
						path: 'systemA',
						component: SystemAComponent,
						data: {
							AuthorityCode: 'C01',
							Title: '系統測試頁A',
						},
					},
					// 系統測試頁B
					{
						path: 'systemB',
						component: SystemBComponent,
						data: {
							AuthorityCode: 'C02',
							Title: '系統測試頁B',
						},
					},
				],
			},
		],
	},

	// 萬用路由導引至login
	{
		path: '**',
		redirectTo: 'login',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
