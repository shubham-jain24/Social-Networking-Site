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
  public sesEmail: String = null;
  public sesId: String = null;
  public sesName: String = null;
  public sesGender: String = null;
  public sesAge: Number = 0;
  public usrId: String = null;

    getBooks()
    {
      return this.http.get('/server/api/books');
    }

    setSessionEmail(email: String)
    {
      this.sesEmail = email;
    }

    getSessionEmail()
    {
      return this.sesEmail;
    }

    setSessionId(id: String)
    {
      this.sesId = id;
    }
    getSessionId()
    {
      return this.sesId;
    }

    setSessionName(name: String)
    {
      this.sesName = name;
    }
    getSessionName()
    {
      return this.sesName;
    }

    setSessionGender(gender: String)
    {
      this.sesGender = gender;
    }
    getSessionGender()
    {
      return this.sesGender;
    }

    setSessionAge(age: Number)
    {
      this.sesAge = age;
    }
    getSessionAge()
    {
      return this.sesAge;
    }

    setUserId(id: String)
    {
      this.usrId = id;
    }

    getUserId()
    {
      return this.usrId;
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

    authenticateUser(email: String, password: String)
    {
      const x = email + '/' + password;
      console.log(x);
      return this.http.get('/server/api/app/authenticate/' + x);
    }

    addUserSession(userDetails)
    {
      let body = JSON.stringify(userDetails);
      return this.http.post('/server/api/session/details', body, httpOptions);
    }

    getUserSession(email: String)
    {
      return this.http.get('/server/api/start/session/' + email);
    }

    deleteUserSession(id: String)
    {
      return this.http.delete('/server/api/delete/session/' + id);
    }

    createPost(postDetails)
    {
      let body = JSON.stringify(postDetails);
      return this.http.post('/server/api/books', body, httpOptions);
    }

    updateUserLiked(userid: String, postid: String)
    {
      userid = userid + '/' + postid;
      return this.http.post('/server/api/like/user/'+ userid, httpOptions);
    }

    updatePostLiked(userid: String, postid: String)
    {
      postid = postid+'/'+userid;
      return this.http.post('/server/api/like/'+ postid, httpOptions);
    }

    registerUser(userDetails)
    {
      let body = JSON.stringify(userDetails);
      return this.http.post('/server/api/register', body, httpOptions);
    }

    getDashboardData(email: String)
    {
      return this.http.get('/server/api/dashboard/' + email);
    }

   
}
