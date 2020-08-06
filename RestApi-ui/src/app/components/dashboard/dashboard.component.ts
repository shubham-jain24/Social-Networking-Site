import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userEmail: String;
  public DashboardData;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getDashboardData();
    
  }

  getDashboardData()
  {
    this.userEmail = this.bookService.getSessionEmail();
    this.bookService.getDashboardData(this.userEmail).subscribe(
      data => {
        this.DashboardData = data;
      },
      err => 
      {
        console.log(err);
      },
      () => console.log("Dashboard data loded successfully")
    )}

}
