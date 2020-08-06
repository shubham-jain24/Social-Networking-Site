import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component'
import { DomainsComponent } from './components/domains/domains.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AllDomainComponent } from './components/all-domain/all-domain.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'domain/:dname',
    component: DomainsComponent
  },
  {
    path: 'user/home',
    component: AuthenticationComponent
  },
  {
    path: 'post/createpost',
    component: CreatePostComponent
  },
  {
    path: 'all/domain',
    component: AllDomainComponent
  },
  {
    path: 'user/dashboard',
    component: DashboardComponent
  },
  {
    path: 'register',
    component: SignupComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
