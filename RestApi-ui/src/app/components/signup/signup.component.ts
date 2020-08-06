import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  genders: String[] = [
    'Male',
    'Female',
    'Other'
  ]


  signupform: FormGroup;
  constructor( private bookService: BookService, private fb: FormBuilder ) { }


  ngOnInit(): void 
  {
      this.signupform = this.fb.group
      ({
        reg_name: ['', Validators.required],
        reg_age: [],
        reg_email: ['', Validators.required],
        reg_password: ['', Validators.required],
        reg_gender: ['', Validators.required],
        reg_phone: ['', Validators.required]
      });  
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
