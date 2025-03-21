import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from './model/User';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  @ViewChild("loginModal") loginModel!: ElementRef;
  isLoginFormVisiable = signal<boolean>(true);
  registerObj: any = {
    "userId": 0,
    "emailId": "",
    "password": "",
    "fullName": "",
    "mobileNo": ""
  };
  loginObj: LoginUser = new LoginUser();
  
  http  = inject(HttpClient);

  loggedUserData: any;

  ngOnInit(): void {
    const localData = localStorage.getItem("golUser");
    if(localData) {
      this.loggedUserData =  JSON.parse(localData);
    }
  }



  toggleForm() {
    this.isLoginFormVisiable.set(!this.isLoginFormVisiable())
  }

  openModel() {
    if(this.loginModel) {
      this.loginModel.nativeElement.style.display = "block";
    }
  }
  closeModel() {
    if(this.loginModel) {
      this.loginModel.nativeElement.style.display = "none";
    }
  }

  onLogOff() {
    this.loggedUserData =  null;
    localStorage.removeItem("golUser")
  }

  onRegister() {
    debugger;
    this.http.post("https://api.freeprojectapi.com/api/GoalTracker/register",this.registerObj).subscribe((res:any)=>{
      debugger;
      alert("Registration Success");
      this.closeModel()
    },error=>{
       debugger;
       alert(error.error);
    })
  }

  onLogin() {
    this.http.post("https://api.freeprojectapi.com/api/GoalTracker/login",this.loginObj).subscribe((res:any)=>{
      debugger;
      alert("Login Success");
      localStorage.setItem('golUser',JSON.stringify(res))
      this.loggedUserData = res;
      this.closeModel()
    },error=>{
       debugger;
       alert(error.error);
    })
  }
}
