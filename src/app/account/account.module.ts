import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AfterRegistrationComponent } from './after-registration/after-registration.component';
import { AfterConfirmEmailComponent } from './after-confirm-email/after-confirm-email.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        AfterRegistrationComponent,
        AfterConfirmEmailComponent
    ]
})
export class AccountModule { }
