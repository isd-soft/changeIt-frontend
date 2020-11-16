import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }
