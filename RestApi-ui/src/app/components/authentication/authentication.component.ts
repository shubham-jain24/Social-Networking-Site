import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  authform: FormGroup;
  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authform = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      postid: new FormControl(this.route.snapshot.params.id, Validators.required)
    });
  }

  VerifyUser()
  {
    //console.log(this.authform.value);
    if(this.authform.valid)
    {
      this.bookService.authenticateUser(this.authform.value).subscribe(
        data =>
        {
          console.log(data);
        },
        error =>
        {
          console.log(error);
        }
        );
      
      // {
      //   console.log("Login Success");
      // }
    }
    else
    {
      console.log("The Data You have Entered Are not Correct");
    }
  }


}
