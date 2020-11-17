import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert';
import { HomeComponent } from './home';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProblemComponent } from './problem/problem.component';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {ProblemModelResolver} from '@app/problem/problem_model.resolver';
import {UserPageComponent} from '@app/user-page/user-page.component';
import { DistrictComponent } from './district/district.component';
import { DomainComponent } from './domain/domain.component';
import {LocationComponent} from '@app/location/location.component';
import { TablesComponent } from './tables/tables.component';
import {DistrictModel} from '@app/repository/district_repository.model';
import {LocationModel} from '@app/repository/location_repository.model';
import {DomainModel} from '@app/repository/domain_repository.model';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        MenuComponent,
        WelcomeComponent,
        ProblemComponent,
        UserPageComponent,
        DistrictComponent,
        DomainComponent,
        LocationComponent,
        TablesComponent
    ],
    providers: [
        ProblemModel, ProblemModelResolver, DistrictModel, LocationModel, DomainModel,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
