import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';
import { Event } from '../event';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


//Events component

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  id= null; 
 
  lang : string;
  EventForm: FormGroup;

  event1 : Event[];
  event2 : Event[];
  dataSource : MatTableDataSource<Event>;
  displayedColumns: string[] = ['demo-id', 'name', 'date','time'];
  utype: string;
  isAdmin: boolean;


  eventId : string ;
  name : string ;
  date : string ;
  time : string ;


  constructor(private httpService: HttpService, private data: DataService,
    private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.data.changeCName('Events');
    this.data.currentLang.subscribe(lang => this.lang =lang );
    let comp: string;
    this.data.cCompNm.subscribe(cname => comp=cname );
    this.data.uType.subscribe(utype => this.utype=utype );
    if(this.utype=='Admin'){this.isAdmin=true;}
    console.log(comp, this.utype);

    this.EventForm = this.formBuilder.group({
      name: [,],
      date: [, ],
      time: [,],
      elang: [this.lang.toUpperCase(), ]

    });
    this.loadAlllEvents();
    //this.httpService.refreshCont$.subscribe(()=>{this.loadAlllEvents();});
    
  }
  get formControls() {
    return this.EventForm.controls; }


    //To load all events from mongoDB
  loadAlllEvents()
  {
    this.data.currentLang.subscribe(lang => this.lang =lang );
    console.log(this.lang.toUpperCase());
    this.httpService.sendGetEventsRequest(this.lang).subscribe(
    (events: Event[]) => {
      this.event1 = events; 
      console.log(events);
      console.log(typeof events); 
     
      this.dataSource = new MatTableDataSource<Event>(this.event1);
      
      console.log(this.event1);
      

      
    });
  }

  //To add new Event
  addEvent(){
    console.log(this.name);
    console.log(this.date);
    console.log(this.time);
    console.log(this.lang);
    //this.loadAlllEvents();
    let newEvent:Event;
    newEvent =<Event>this.EventForm.value;


    console.log(newEvent);
    
    this.httpService.sendAddEventRequest(newEvent).subscribe(
      (events: Event) => { 
        
        console.log(events);
        console.log(typeof events); });
        alert('Press OK to Confirm Addition') ;
    this.loadAlllEvents();

  }

  //To delete Event
  deleteEvent(){
    console.log(this.eventId);
    this.loadAlllEvents();
    let dEvent:Event;
    this.httpService.sendDeleteEventRequest(this.eventId).subscribe(
      (events: Event) => {
        dEvent = events; 
        if(events!=null){
        return;}
        console.log(events);
        console.log(typeof events); });
        alert('Press OK to Confirm Deletion') ;
    this.loadAlllEvents();
  }

}
