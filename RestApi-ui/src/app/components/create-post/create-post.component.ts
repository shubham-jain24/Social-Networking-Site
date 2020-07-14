import { Component, OnInit, ɵgetComponentViewDefinitionFactory } from '@angular/core';
import { BookService } from '../../services/book.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  domains: String[] = [
    'Photography',
    'Fashion Designing',
    'Dancing',
    'Modeling',
    'Singing',
    'Technology',
    'Cooking',
    'Business',
    'Engineering',
    'Acting',
    'Painting',
    'Others'
  ];

  genders: String[] = [
    'Male',
    'Female',
    'Other'
  ]




  postform: FormGroup;
  constructor( private bookService: BookService, private fb: FormBuilder ) { }


  ngOnInit(): void {
    this.postform = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      age: [],
      gender: ['', Validators.required],
      posts: this.fb.group(
      {
        domain: ['', Validators.required],
        postcontent: ['', Validators.required],
        postimage:this.fb.array([
          new FormControl('')
        ])
      }
      ),
      phone: ['', Validators.required]

    });
    
  }

  getlink()
  {
    return this.postform.get('posts').get('postimage') as FormArray;
  }

  addImageLink()
  {
    const arr = this.getlink();
    arr.push(this.fb.control(''));
  }

  postdetails()
  {
    if(this.postform.valid)
    {
      this.bookService.createPost(this.postform.value).subscribe(
        data =>
        {
          this.postform.reset();
          console.log(data);
        },
        error =>
        {
          console.log(error);
        }
        );
    }
    else
    {
      console.log("The Data You have Entered Are not Correct");
    }
  }



}
