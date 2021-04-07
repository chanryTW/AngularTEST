import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageGuard implements CanActivateChild {

  constructor(
		private router: Router
	) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // 回傳權限檢查結果
    // ...
    
    // 回傳是否登入
    return !sessionStorage.getItem('userData') ? this.router.navigate(['/login']) : true;
  }
}
