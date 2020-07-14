import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component'
import { DomainsComponent } from './components/domains/domains.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AllDomainComponent } from './components/all-domain/all-domain.component';

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
    path: 'home/authenticate/:id',
    component: AuthenticationComponent
  },
  {
    path: 'post/createpost',
    component: CreatePostComponent
  },
  {
    path: 'all/domain',
    component: AllDomainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
