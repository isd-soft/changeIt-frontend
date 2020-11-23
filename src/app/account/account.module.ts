import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AfterRegistrationComponent } from './after-registration/after-registration.component';
import { AfterConfirmEmailComponent } from './after-confirm-email/after-confirm-email.component';
import {RouterModule} from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        AfterRegistrationComponent,
        AfterConfirmEmailComponent,
        ResetPasswordComponent,
        NewPasswordComponent
    ]
})
export class AccountModule { }
