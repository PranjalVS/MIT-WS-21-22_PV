import {  Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { News } from '../news';
import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild} from '@angular/core';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: string;
  public news: News[];
  public columns = ['newsTitle', 'newsContent'];
  lang : string ;
  now: string;
  displayedColumns: string[] = ['id', 'description', 'organizer', 'participants'];
  dataSource = new MatTableDataSource<object>([]);
  nDataSource : MatTableDataSource<News>;
 
  
  @ViewChild(MatPaginator) paginator: MatPaginator;//pagination added to view single news at a time 

 


  constructor(private httpService: HttpService, private data : DataService) {
    let myUrl = environment.SOCKET_ENDPOINT + "/news";

  }
  
 
  ngOnInit(): void {
    
    
    this.data.changeCName('News');
    this.data.currentLang.subscribe(lang => this.lang =lang );
    console.log(this.lang.toUpperCase());
    
    let langOld =this.lang.toUpperCase();
    console.log(langOld);
    this.data.refreshWindow$.subscribe(()=>{
      this.data.currentLang.subscribe(lang => this.lang =lang );
    });
    if(langOld != this.lang){
      langOld= this.lang.toUpperCase();
      this.httpService.refreshCont$.subscribe(()=>{this.loadAllNews();});
      console.log(langOld);
      console.log(this.lang.toUpperCase());
    }
    
   
    this.loadAllNews();
  
  };

  langChanged()
  {
    this.httpService.refreshCont$.subscribe(()=>{this.loadAllNews();});
    console.log('in news');
  }

  //Load All news data from mongoDB through service call
  loadAllNews(){
    this.httpService.sendGetNewsRequest(this.lang)
    .subscribe((news: News[]) => {
      this.news = news;
      this.loading = false;
      this.nDataSource = new MatTableDataSource<News>(this.news);
      this.nDataSource.paginator = this.paginator;
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      this.loading = false;

    });
  
    
  }

  
}


