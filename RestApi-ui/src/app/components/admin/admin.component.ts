import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public books;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks()
  {
    this.bookService.getBooks().subscribe(
      data => {this.books = data},
      err => console.error(err),
      () => console.log('Books retreived successfully from database')
    );
  }

}
