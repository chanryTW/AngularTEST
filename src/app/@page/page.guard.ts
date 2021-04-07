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
    return true
    // 沒權限
    // this.router.navigate(['/login']);
    // return false;
  }
  
}
