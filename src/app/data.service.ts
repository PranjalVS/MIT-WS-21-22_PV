import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private msgSource = new BehaviorSubject<string>("EN");
  private msgSource1 = new BehaviorSubject<boolean>(false);
  private msgSource2 = new BehaviorSubject<string>("Student");
  private msgSource3 = new BehaviorSubject<string>("");
  currentLang =this.msgSource.asObservable();
  lChanged = this.msgSource1.asObservable();
  uType = this.msgSource2.asObservable();
  cCompNm = this.msgSource3.asObservable();

  private _refreshWindow$ = new Subject<void>();
  get refreshWindow$(){
    return this._refreshWindow$;
  }

;
  constructor() { }

  changeLang(lang : string){
     this.msgSource.next(lang);
     
    this.msgSource.pipe(tap(() => {
        this._refreshWindow$.next();
      })
      );
      this.msgSource1.next(true);
      
      //this.httpService.refreshCont$.subscribe(()=>{this.news.loadAllNews();});
}


changeUType(utype : string){
  this.msgSource2.next(utype);

   
   //this.httpService.refreshCont$.subscribe(()=>{this.news.loadAllNews();});
}

changeCName(cname : string){
  this.msgSource3.next(cname);

   
   //this.httpService.refreshCont$.subscribe(()=>{this.news.loadAllNews();});
}
}
