import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {AuthGuard} from './helpers';
import {WelcomeComponent} from '@app/welcome/welcome.component';
import {LoginComponent} from '@app/account/login/login.component';
import {RegisterComponent} from '@app/account/register/register.component';
import {ProblemComponent} from '@app/problem/problem.component';
import {UserPageComponent} from '@app/user-page/user-page.component';
import {AddProblemComponent} from '@app/add-problem/add-problem.component';
import {TablesComponent} from '@app/tables/tables.component';
import {AfterRegistrationComponent} from '@app/account/after-registration/after-registration.component';
import {AfterConfirmEmailComponent} from '@app/account/after-confirm-email/after-confirm-email.component';
import {ResetPasswordComponent} from '@app/account/reset-password/reset-password.component';
import {NewPasswordComponent} from '@app/account/new-password/new-password.component';
import {StatisticComponent} from '@app/statistics/statistic.component';
import {AdminGuard} from '@app/helpers/admin.guard';
import {UsersComponent} from '@app/users/users.component';
import {UserShowComponent} from '@app/user-show/user-show.component';
import {UsersResolver} from '@app/users/users.resolver';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/confirm', component: AfterRegistrationComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'user/savePassword', component: NewPasswordComponent},
  {path: 'api/v1/user/registrationConfirm', component: AfterConfirmEmailComponent},
  {path: 'problem/add', component: AddProblemComponent, canActivate: [AuthGuard]},
  {path: 'problem/:id', component: ProblemComponent, canActivate: [AuthGuard]},
  {path: 'tables', component: TablesComponent, canActivate: [AdminGuard]},
  {path: 'statistics', component: StatisticComponent, canActivate: [AuthGuard]},
  {path: '', component: WelcomeComponent},
  {path: 'user-page', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'new-password', component: NewPasswordComponent},
  {path: 'user-show/:id', component: UserShowComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard], resolve: {model: UsersResolver}},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
