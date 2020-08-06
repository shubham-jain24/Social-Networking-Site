import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookService } from './services/book.service';
import { AdminComponent } from './components/admin/admin.component';
import { DomainsComponent } from './components/domains/domains.component';
import { SafePipe } from './safe.pipe';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AllDomainComponent } from './components/all-domain/all-domain.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditdashboardComponent } from './components/editdashboard/editdashboard.component';
import { EditpostComponent } from './components/editpost/editpost.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DomainsComponent,
    SafePipe,
    AuthenticationComponent,
    EditPostComponent,
    CreatePostComponent,
    AllDomainComponent,
    SignupComponent,
    DashboardComponent,
    EditdashboardComponent,
    EditpostComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
