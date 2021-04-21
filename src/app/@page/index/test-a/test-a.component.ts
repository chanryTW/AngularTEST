import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { map, filter, debounceTime, distinct } from 'rxjs/operators';
// import { ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-test-a',
  templateUrl: './test-a.component.html',
  styleUrls: ['./test-a.component.scss']
})
export class TestAComponent implements OnInit {
  // @ViewChild ('listEnd') private listEnd :ElementRef;
  @ViewChild ('scrollLoad') scrollLoad :any;

  // 觀察滾動執行
  private scrollLoadSubscription :any;

  // 避免滾動重複執行
  // flag :boolean = false;

  // 產生測試item
  items = Array(10);

  constructor(
    // private element: ElementRef,
    // private scrollDispatcher: ScrollDispatcher
  ) { }

  ngOnInit(): void {
    // 停止一秒才觸發
    // this.scrollDispatcher.scrolled(1000).subscribe( (scrollable :any) => {
    //   console.log('scroll', scrollable);
    //   console.log(scrollable.getElementRef().nativeElement);
    // });
  }

  ngAfterViewInit() {
    // 加入觀察者並訂閱
    this.scrollLoadSubscription = this.scrollLoad.scrollLoad$.subscribe((page:Number) => {
      console.log('執行載入api第'+page+'頁');
      // 模擬寫進資料
      for (let i = 1; i <= 10; i++) {
        this.items.push([]);
      }
    });

    /**
     * 方法一、Intersection Observer API 滾動到最底部時呼叫
     */
    // const observer = new IntersectionObserver(
    //   (entries, observer) => {
    //    entries.forEach(entry => {
    //     if (entry.isIntersecting) {
    //       console.log('方法一、載入10筆')
    //       // 模擬寫進資料
    //       for (let i = 1; i <= 10; i++) {
    //         this.items.push([]);
    //       }
    //     }
    //    });
    //   }, { threshold: 0 } // 臨界值0
    //  );
    //  observer.observe(this.listEnd.nativeElement);
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

  /**
   * 方法二、Rxjs 滾動到最底部時呼叫
   */
  // private itemHeight = 210;
  // private numberOfItems = 10; // 一頁的item數

  // // 當頁面捲動
  // private pageByScroll$ :any = fromEvent(window, "scroll").pipe(
  //   debounceTime(200), // .2秒沒新值才觸發（控制頻率）
  //   map( (res :any) =>  window.scrollY ), // 只取scrollY
  //   filter( (current :any) => { // 滾動到 底部100px高 執行
  //     // main頁面高度 - 客戶端高度 - 滾動高度 <100
  //     return document.getElementsByTagName('main')[0].clientHeight - document.documentElement.clientHeight - current <100
  //   }),
  //   map( (y:any) => { // 計算欲載入頁數
  //     // 進位(main頁面高度 / (單item高度 * 一頁的item數)) +1
  //     return Math.ceil( document.getElementsByTagName('main')[0].clientHeight / (this.itemHeight * this.numberOfItems) )
  //   }),
  //   distinct() // 刪除重複
  // ).subscribe(page => {
  //   // 執行http載入第page頁資料
  //   // push進list
  //   console.log('方法二，呼叫後端第', page, '頁');
  //   // 模擬寫進資料
  //   for (let i = 1; i <= 10; i++) {
  //     this.items.push([]);
  //   }
  // });

  // private pageByScroll$ = Observable.fromEvent(window, "scroll")
  // .map(() => window.scrollY)
  // .filter(current => current >=  document.body.clientHeight - window.innerHeight)
  // .debounceTime(200) 
  // .distinct() 
  // .map(y => Math.ceil((y + window.innerHeight)/ (this.itemHeight * this.numberOfItems)));

  // 當視窗大小改變
  // private pageByResize$ :any = fromEvent(window, "resize").pipe(
  //   debounceTime(200),
  //   map( (_:any) => {
  //     Math.ceil(
  //       (window.innerHeight + document.body.scrollTop) / 
  //       (this.itemHeight * this.numberOfItems)
  //     )
  //   })
  // ).subscribe(x => console.log('pageByResize$: ',x));

  // private pageByResize$ = Observable.fromEvent(window, "resize")
  //   .debounceTime(200) 
  //   .map(_ => Math.ceil(
  //       (window.innerHeight + document.body.scrollTop) / 
  //       (this.itemHeight * this.numberOfItems)
  //     ));

  // private pageToLoad$ = merge(this.pageByManual$, this.pageByScroll$, this.pageByResize$).pipe(
  //   distinct(),
  //   filter( (page :any) => {
  //     return this.cache[page-1] === undefined;
  //   })
  // )

  // private pageToLoad$ = Observable
  //   .merge(this.pageByManual$, this.pageByScroll$, this.pageByResize$)
  //   .distinct() 
  //   .filter(page => this.cache[page-1] === undefined); 

  ngOnDestroy(): void {
		// 清除訂閱
		// this.pageByScroll$.unsubscribe();
		// this.pageByResize$.unsubscribe();
    this.scrollLoadSubscription.unsubscribe();
	}
}