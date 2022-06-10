import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { MatFormField } from '@angular/material/form-field';
 import { MatInput } from '@angular/material/input';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../user';
import { JwtService } from '../jwt.service';
import { DataService } from '../data.service';


// for RegisterDialog
export interface DialogData {
  username: string;
  email: string;
  password: string;
  usertype: string;
}
export interface UserType {
  value: string;
  viewValue: string;
}
/**
 * @title Dialog Register
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


  

  constructor(private jwtService: JwtService, private router: Router, 
    private formBuilder: FormBuilder, public dialog: MatDialog, private data: DataService) { }

  loginForm: FormGroup;
  loggedU:User;
  isSubmitted = false;
  // form element values
  selectedUser = "";
  username: string;
  email: string;
  password: string;
  usertype: string ;
  users:UserType[]=[{value:'admin',viewValue:'Admin'},{value:'stud',viewValue:'Student'}];

 

//To Open registration page
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialog, {
      width: '350px',

      data: { usertype: this.usertype,username: this.username, email: this.email, password: this.password }
    });
    
    let addedU : User ;
    dialogRef.afterClosed().subscribe(data => {
      if(data != undefined || data != null)
      {
      console.log("dialogRef.afterClosed data: ");
      console.log(data);
      console.log("dialogRef.componentInstance.data");
      console.log(dialogRef.componentInstance.data);
      
      console.log(dialogRef.componentInstance.data.username, dialogRef.componentInstance.data.password,
        dialogRef.componentInstance.data.usertype, dialogRef.componentInstance.data.email);

     const registerUser = <User>dialogRef.componentInstance.data;
        console.log(registerUser);
   
      this.jwtService.register(registerUser);
      this.jwtService.loginU(registerUser).subscribe((user: User) => {
        addedU = user;
      
      });

      if(addedU!=null && addedU!=undefined) 
      {
        alert('User registered successfully!');
      }
      else 
      {
        alert('Registration window closed!');
      }
      
      console.log('The register dialog was closed');
      
      //this.router.navigateByUrl('/admin');
      }
      
      
    });
   
  }


  ngOnInit(): void {
    this.data.changeCName("login");
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      usertype: ['', Validators.required]

    });
   //this.login();
  }

  get formControls() {
     return this.loginForm.controls; }

  
  selectCng(userT : string){
    this.usertype=userT;
    console.log(this.usertype);
  }

//To check data in MongoDB and login, (works when login button is clicked again after alert message)
  login() {
    
    let   loggedU : User ;
    this.isSubmitted = true;
    console.log(this.loginForm.value.username  );
    console.log(this.loginForm.value.usertype );
    if (this.loginForm.invalid) {
      console.log(this.loginForm.value.username );
      return;
    }
    console.log(this.loginForm.value );
    let user1 = <User>this.loginForm.value;
    console.log(user1 );
    /*this.jwtService.login(user1).subscribe((user1: User) => {
      loggedU = user1;
    });*/
    this.jwtService.loginU(user1).subscribe((user1: User) => {
      loggedU = user1;
    });
    this.jwtService.loginU(user1).subscribe((user:User)=>{
      this.loggedU = user;
      console.log(this.loggedU);}
      );
 
    if(this.loggedU != null &&  this.loggedU != undefined){
    console.log(this.loggedU);
    this.data.changeUType(this.loggedU.usertype);
    this.router.navigateByUrl('/admin');
    }
    else{
      alert('Kindly press Login again to enter next page');
    }
    
  }
}

@Component({
  selector: 'register-dialog',
  templateUrl: 'register-dialog.html',
})


//Registration 
export class RegisterDialog {
  constructor( 
    public dialogRef: MatDialogRef<RegisterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

onNoClick(): void {
    console.log('closed');
    this.dialogRef.close();
  }
}
