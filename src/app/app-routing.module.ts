import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {AuthGuard} from './helpers';
import {WelcomeComponent} from '@app/welcome/welcome.component';
import {LoginComponent} from '@app/account/login/login.component';
import {RegisterComponent} from '@app/account/register/register.component';
import {ProblemComponent} from '@app/problem/problem.component';
import {ProblemModelResolver} from '@app/problem/problem_model.resolver';
import {UserPageComponent} from '@app/user-page/user-page.component';
import {AddProblemComponent} from '@app/add-problem/add-problem.component';
import {TablesComponent} from '@app/tables/tables.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'problem/add', component: AddProblemComponent, canActivate: [AuthGuard]},
  {path: 'problem/:id', component: ProblemComponent, canActivate: [AuthGuard], resolve: {model: ProblemModelResolver}},
  { path: 'tables', component: TablesComponent, canActivate: [AuthGuard]},
  {path: '', component: WelcomeComponent},
  {path: 'user-page', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
