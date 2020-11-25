import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {JwtInterceptor, ErrorInterceptor} from './helpers';
import {AppComponent} from './app.component';
import {AlertComponent} from './alert';
import {HomeComponent} from './home';
import {MenuComponent} from './menu/menu.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProblemComponent} from './problem/problem.component';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {ProblemModelResolver} from '@app/problem/problem_model.resolver';
import {UserPageComponent} from '@app/user-page/user-page.component';
import {AddProblemComponent} from './add-problem/add-problem.component';
import {DistrictComponent} from './district/district.component';
import {DistrictModel} from '@app/repository/district_repository.model';
import {DomainComponent} from './domain/domain.component';
import {DomainModel} from '@app/repository/domain_repository.model';
import {LocationComponent} from '@app/location/location.component';
import {LocationModel} from '@app/repository/location_repository.model';
import {EditorModule} from '@tinymce/tinymce-angular';
import {TablesComponent} from './tables/tables.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProblemPipe} from '@app/pipe/problem-pipe.pipe';
import { CommentComponent } from './comment/comment.component';
import {CommentModel} from '@app/repository/comment_repository.model';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import { StatisticComponent } from './statistics/statistic.component';
import { OurProblemsResultComponent } from './statistics/our-problems-result/our-problems-result.component';
import { ProblemsByDomainsComponent } from './statistics/problems-by-domains/problems-by-domains.component';
import { ProblemsByDistrictComponent } from './statistics/problems-by-district/problems-by-district.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    EditorModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBEcxa0sOCZ3CMOYboi-buCqex6HxY2baM',
      libraries: ['places']
    })
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    MenuComponent,
    WelcomeComponent,
    ProblemComponent,
    UserPageComponent,
    AddProblemComponent,
    DistrictComponent,
    DomainComponent,
    LocationComponent,
    TablesComponent,
    CommentComponent,
    ProblemPipe,
    StatisticComponent,
    OurProblemsResultComponent,
    ProblemsByDomainsComponent,
    ProblemsByDistrictComponent,


  ],
  providers: [
    ProblemModel, ProblemModelResolver, LocationModel, DistrictModel, DomainModel, CommentModel,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
