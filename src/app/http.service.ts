import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Event } from './event';
import { DataService } from './data.service';
import { Mensa } from './mensa';
import { News } from './news';
import { tap,map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  

  BASE_URL = environment.SOCKET_ENDPOINT;
  lang: string;
  private _refreshCont$ = new Subject<void>();
  get refreshCont$(){
    return this._refreshCont$;
  }

  constructor(private httpClient: HttpClient, private data: DataService) { }

 

  sendGetMensaRequest(url: string) {
    return this.httpClient.get<Mensa[]>(url); // get Mensa Array
  }

  sendGetNewsRequest(lang :string) : Observable<News[]> {
    console.log(`${this.BASE_URL}/news/${lang}`);
    return this.httpClient.get<News[]>(`${this.BASE_URL}/news/${lang}`).pipe(tap(() => {
      this._refreshCont$.next();
    })
    );
    
  // return this.httpClient.get<News[]>(url);
  }

  sendGetEventsRequest(lang :string) : Observable<Event[]> {
    console.log(`${this.BASE_URL}/events/${lang}`);
    return this.httpClient.get<Event[]>(`${this.BASE_URL}/events/${lang}`).pipe(tap(() => {
      this._refreshCont$.next();
    })
    );
    
  // return this.httpClient.get<News[]>(url);
  }

  sendDeleteEventRequest(id: string): Observable<Event> {
    console.log(id);
    return this.httpClient.delete<Event>(`${this.BASE_URL}/events/${id}`); // delete event
  }

  sendAddEventRequest(newEvent: Event):Observable<Event> {
    this.data.currentLang.subscribe(lang => this.lang =lang );
    //let el = this.lang.toUpperCase();
    console.log(newEvent);
    return this.httpClient.post<Event>(`${this.BASE_URL}/events`,{ name: newEvent.name, date: newEvent.date, time: newEvent.time, elang: newEvent.elang}); // add new event
  }
  /*
  sendPostRequest(data: Object): Observable<Object> {
    return this.httpClient.post(this.apiUrl, data);
  }
  */
}
