import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { SocketioService } from '../socketio.service';

import { DataService } from '../data.service';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
  

export class AdminComponent implements OnInit, OnDestroy {


  

  constructor(private jwtService: JwtService,private router: Router, private httpService: HttpService, 
    private socketService: SocketioService, private data: DataService) {
   


  }
  
  ngOnInit(): void {
    
    this.data.changeCName('Admin');
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
 
  logout() {
    this.jwtService.logout();
    this.router.navigateByUrl('/login');
  }
}
