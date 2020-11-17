import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProblemComponent } from './problem/problem.component';
import {DistrictModel} from '@app/repository/district_repository.model';
import {AlertComponent} from '@app/alert';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {ProblemModelResolver} from "@app/problem/problem_model.resolver";
import {LocationModel} from "@app/repository/location_repository.model";



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        MenuComponent,
        WelcomeComponent,
        ProblemComponent,
    ],
    providers: [
        ProblemModel, ProblemModelResolver, DistrictModel, LocationModel,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
