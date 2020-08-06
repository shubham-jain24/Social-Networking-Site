import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationComponent } from '../../components/authentication/authentication.component';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  public DomainData;
  public domainName : String;
  public userEmail : String;


  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.domainName = this.route.snapshot.params.dname;
    this.getDomainData(this.route.snapshot.params.dname);
  }

  getDomainData(dname: String)
  {
    this.bookService.getDomainSpecificPost(dname).subscribe(
      data => { 
        this.DomainData = data
        console.log(data[0].name);
        console.log(data[0].liked.length);
      },
      err => console.error(err),
      () => console.log('Domain Data Loaded Successfully')
    );
  }

  updateUserVoteCount(id: String, vote: Number)
  {
    this.userEmail = this.bookService.getSessionEmail();
    if(this.userEmail != null)
    {
      console.log(id);
      console.log(this.userEmail);
      console.log(vote);
      this.bookService.updateUserLiked(this.userEmail, id).subscribe(
        data =>
        {
          console.log("User Count Updated");
          this.bookService.updatePostLiked(this.userEmail, id).subscribe(
            data => {
              console.log("Successfully added");
              this.ngOnInit();
            },
            err=> 
            {
              console.log(err);
            }
          )
        },
        err => console.log(err)
      )
      // this.bookService.updateVoteCount(id,vote).subscribe(
      //   err => console.log(err),
      //   () => console.log('Count Updated')
      
      // );
      // this.ngOnInit();
    }
  }

  editPostDetailsVerification(id: String)
  {
    //this.auth.authform.value.postid = id;
    this.router.navigate(['/home/authenticate']);
  }

}
