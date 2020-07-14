import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  public DomainData;
  public domainName : String;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.domainName = this.route.snapshot.params.dname;
    this.getDomainData(this.route.snapshot.params.dname);
  }

  getDomainData(dname: String)
  {
    this.bookService.getDomainSpecificPost(dname).subscribe(
      data => { this.DomainData = data},
      err => console.error(err),
      () => console.log('Domain Data Loaded Successfully')
    );
  }

  updateUserVoteCount(id: String, vote: Number)
  {
    console.log(id);
    this.bookService.updateVoteCount(id,vote).subscribe(
      err => console.log(err),
      () => console.log('Count Updated')
     
    );
    this.ngOnInit();
  }

  editPostDetailsVerification(id: String)
  {
    //this.auth.authform.value.postid = id;
    this.router.navigate(['/home/authenticate/' + id]);
  }

}
