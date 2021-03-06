import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  errMsg : string;
  isLoginError : boolean = false;
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(userName,password){
    
    this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
        // Storing unique token using HTML5 storage
        localStorage.setItem('userToken', data[1]);
        this.router.navigate(['/home']);
     
    },
    (err : HttpErrorResponse)=>{
        this.isLoginError = true;
        this.errMsg = err.error.message;
    });
  
  }
}
