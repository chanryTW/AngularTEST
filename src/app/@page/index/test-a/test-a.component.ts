import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { map, filter, debounceTime, distinct } from 'rxjs/operators';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-test-a',
  templateUrl: './test-a.component.html',
  styleUrls: ['./test-a.component.scss']
})
export class TestAComponent implements OnInit {

  // 避免滾動重複執行
  flag :boolean = false;

  constructor(
    private element: ElementRef,
    private scrollDispatcher: ScrollDispatcher
  ) { }

  ngOnInit(): void {
    // 停止一秒才觸發
    // this.scrollDispatcher.scrolled().subscribe( (scrollable :CdkScrollable) => {
    //   console.log('發生scroll了，來源為：');
    //   console.log(scrollable.getElementRef().nativeElement);
    // });
  }

  // @HostListener('window:scroll', ['$event']) onScroll($event: Event): void {   
  //   //main頁面 高度
  //   var mainHight = document.getElementsByTagName('main')[0].clientHeight;
  //   //客戶端 高度
  //   var clientHight = document.documentElement.clientHeight;
  //   //滾動 高度
  //   var scrollTop = document.documentElement.scrollTop;

  //   // const scrolled = this.element.nativeElement.scrollTop;
  //   // const height = this.element.nativeElement.offsetHeight;

  //   //滾動到 底部100px高 執行
  //   if (mainHight - clientHight - scrollTop < 100) {
  //       if (!this.flag) {
  //           console.log('載入新資料');
  //       }
  //       // 避免重複執行
  //       this.flag = true;
  //   }
  // }

  private cache = []; 
  private pageByManual$ = new BehaviorSubject(1);
  private itemHeight = 220;
  private numberOfItems = 10; // 一頁的item數

  // 當頁面捲動
  private pageByScroll$ :any = fromEvent(window, "scroll").pipe(
    debounceTime(200), // 停止.2秒才觸發
    map( (res :any) =>  window.scrollY ), // 只取scrollY
    filter( (current :any) => { // 滾動到 底部100px高 執行
      // main頁面高度 - 客戶端高度 - 滾動高度 <100
      console.log('123');
      return document.getElementsByTagName('main')[0].clientHeight - document.documentElement.clientHeight - current <100
    }),
    map( (y:any) => { // 計算欲載入頁數
      // 進位(main頁面高度 / (單item高度 * 一頁的item數)) +1
      return Math.ceil( document.getElementsByTagName('main')[0].clientHeight / (this.itemHeight * this.numberOfItems) ) + 1
    }),
    distinct() // 刪除重複
  ).subscribe(page => {
    // 執行http載入第page頁資料
    // push進list
    console.log('pageByScroll$: ', page);
  });

  // private pageByScroll$ = Observable.fromEvent(window, "scroll")
  // .map(() => window.scrollY)
  // .filter(current => current >=  document.body.clientHeight - window.innerHeight)
  // .debounceTime(200) 
  // .distinct() 
  // .map(y => Math.ceil((y + window.innerHeight)/ (this.itemHeight * this.numberOfItems)));

  // 當視窗大小改變
  private pageByResize$ :any = fromEvent(window, "resize").pipe(
    debounceTime(200),
    map( (_:any) => {
      Math.ceil(
        (window.innerHeight + document.body.scrollTop) / 
        (this.itemHeight * this.numberOfItems)
      )
    })
  ).subscribe(x => console.log('pageByResize$: ',x));

  // private pageByResize$ = Observable.fromEvent(window, "resize")
  //   .debounceTime(200) 
  //   .map(_ => Math.ceil(
  //       (window.innerHeight + document.body.scrollTop) / 
  //       (this.itemHeight * this.numberOfItems)
  //     ));

  private pageToLoad$ = merge(this.pageByManual$, this.pageByScroll$, this.pageByResize$).pipe(
    distinct(),
    filter( (page :any) => {
      return this.cache[page-1] === undefined;
    })
  )

  // private pageToLoad$ = Observable
  //   .merge(this.pageByManual$, this.pageByScroll$, this.pageByResize$)
  //   .distinct() 
  //   .filter(page => this.cache[page-1] === undefined); 

  ngOnDestroy(): void {
		// 清除訂閱
		this.pageByScroll$.unsubscribe();
		this.pageByResize$.unsubscribe();
	}
}