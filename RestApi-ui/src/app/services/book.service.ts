import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

    getBooks()
    {
      return this.http.get('/server/api/books');
    }

    getDomainSpecificPost(dname: String)
    {
      return this.http.get('/server/api/books/domain/' + dname);
    }

    updateVoteCount(id: String, vote: Number)
    {
      id = id + '/' + vote;
      return this.http.put('/server/api/post/' + id, httpOptions);
    }

    authenticateUser(authDetails)
    {
      let body = JSON.stringify(authDetails);
      return this.http.post('/server/api/app/authenticate', body, httpOptions);
    }

    createPost(postDetails)
    {
      let body = JSON.stringify(postDetails);
      return this.http.post('/server/api/books', body, httpOptions);
    }

   
}
