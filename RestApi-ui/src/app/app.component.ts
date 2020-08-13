import { BookService } from './services/book.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RestApi-ui';

  genders: String[] = [
    'Male',
    'Female',
    'Other'
  ]


  authform: FormGroup;
  signupform: FormGroup;

  private sessionId: string = null;
  private sessionEmail: String = null;
  private sessionName: String = null;
  private sessionGender: String = null;
  private sessionAge: Number = 0;
  private userId: String = null;
  public signupFlag = 0;
  public loginFlag = 1;
  constructor(private router: Router, public bookService: BookService, private route: ActivatedRoute,  private fb: FormBuilder) {}


  ngOnInit(): void {
    this.signupform = this.fb.group
      ({
        reg_name: ['', Validators.required],
        reg_age: [],
        reg_email: ['', Validators.required],
        reg_password: ['', Validators.required],
        reg_gender: ['', Validators.required],
        reg_phone: ['', Validators.required]
      }); 

    this.authform = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  
  logout()
  {
    this.bookService.deleteUserSession(this.sessionId).subscribe(
      data => {
        console.log("Session Over");
        this.bookService.setSessionId(null);
        this.bookService.setSessionEmail(null);
        this.bookService.setSessionName(null);
        this.bookService.setSessionGender(null);
        this.bookService.setSessionAge(0);
        this.router.navigate(['/']);
      },
      error =>
      {
        console.log(error);
      }
    ); 

  }

  signup()
  {
    this.signupFlag = 1;
    this.loginFlag = 0;
  }

  login()
  {
    this.loginFlag = 1;
    this.signupFlag = 0;
  }



  VerifyUser()
  {
    if(this.authform.valid)
    {
      this.bookService.authenticateUser(this.authform.value.email, this.authform.value.password).subscribe(
        data =>
        {
          this.sessionName = data[0].reg_name;
          this.sessionGender = data[0].reg_gender;
          this.sessionAge = data[0].reg_age;
          this.userId = data[0]._id;
          this.bookService.addUserSession(this.authform.value).subscribe(
            details => 
            {
              this.bookService.getUserSession(this.authform.value.email).subscribe(
                sessionDetails =>
                {
                  this.sessionId = sessionDetails[0]._id;
                  this.sessionEmail = sessionDetails[0].email;
                  this.bookService.setSessionEmail(this.sessionEmail);
                  this.bookService.setSessionId(this.sessionId);
                  this.bookService.setSessionName(this.sessionName);
                  this.bookService.setSessionGender(this.sessionGender);
                  this.bookService.setSessionAge(this.sessionAge);
                  this.bookService.setUserId(this.userId);
                  console.log("login Success");
                  this.router.navigate(['/user/home']);
                },
                error =>
                {
                  console.log("session Error");
                }
              )
            },
            error =>
            {
              console.log("Inner Loop Error");
              console.log(error);
            }
          )
        },
        error =>
        {
          console.log("Outer Loop Error");
          console.log(error);
        }
        );
    }
    else
    {
      console.log("The Data You have Entered Are not Correct");
    }
  }

  getUserDetails()
  {
    this.bookService.registerUser(this.signupform.value).subscribe(data =>
      {
        this.signupform.reset();
        console.log(data);
      },
      error =>
      {
        console.log(error);
      });
  }




}
