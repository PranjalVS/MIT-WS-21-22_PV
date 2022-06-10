import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../http.service';
import { Mensa } from '../mensa';

//****get data from mensa through AJAX call for each day dynamically****//

@Component({
  selector: 'app-mensa',
  templateUrl: './mensa.component.html',
  styleUrls: ['./mensa.component.css']
  
})
export class MensaComponent implements OnInit {
  
  id= null; // food item id
  name = "";
  category = "";
  prices : {
    students:string,employees:string,pupils:string,others:string};

  tdate = new Date();
  mensa1 : Mensa[];
  mensa2 : Mensa[];
  dataSource : MatTableDataSource<Mensa>;
  displayedColumns: string[] = ['demo-id', 'name', 'category','prices'];

  

  constructor(private httpService: HttpService,) {
    
    let cYear = new Date().getUTCFullYear();
    console.log("date: ",cYear);
    let cMonth =( new Date().getUTCMonth())+1;
    console.log("date: ",cMonth);
    let cDate = new Date().getUTCDate();
    console.log("date: ",cDate);
    let myUrl = "https://openmensa.org/api/v2/canteens/198/days/"+cYear+"-"+cMonth+"-"+cDate+"/meals";
    this.mensa2 =[];
    console.log("MensaAdmin component: Sending request");
    this.httpService.sendGetMensaRequest(myUrl).subscribe(
      (responseBody) => {
        this.mensa1 = responseBody; // get mensa items array
        console.log(responseBody);
        console.log(typeof responseBody); 
        console.log(responseBody[0].name); // must be a mensa object
        
        this.mensa1.forEach(robject => {
          this.mensa2.push({ id: robject.id, name: robject.name, category: robject.category, prices:robject.prices});
        });
        
        
        console.log(this.mensa2);
        this.dataSource = new MatTableDataSource<Mensa>(this.mensa2);//to load data into a mat-table

        
      });

  


   }

  ngOnInit(): void {
  }

}
