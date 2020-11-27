import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {JwtInterceptor, ErrorInterceptor} from './helpers';
import {AppComponent} from './app.component';
import {HomeComponent} from './home';
import {MenuComponent} from './menu/menu.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProblemComponent} from './problem/problem.component';
import {ProblemModel} from '@app/repository/problem_repository.model';
import {ProblemModelResolver} from '@app/problem/problem_model.resolver';
import {UserPageComponent} from '@app/user-page/user-page.component';
import {AddProblemComponent} from './add-problem/add-problem.component';
import {DistrictModel} from '@app/repository/district_repository.model';
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
import { ProblemsByDistrictComponent } from './statistics/problems-by-district/problems-by-district.component';
import { AgmCoreModule } from '@agm/core';
import {AlertComponent} from '@app/alert';
import {DomainComponent} from '@app/domain/domain.component';
import {StatisticComponent} from '@app/statistics/statistic.component';
import {ProblemsByDomainsComponent} from '@app/statistics/problems-by-domains/problems-by-domains.component';
import {OurProblemsResultComponent} from '@app/statistics/our-problems-result/our-problems-result.component';
import {DistrictComponent} from '@app/district/district.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { GaleryComponent } from './galery/galery.component';
import { UsersComponent } from './users/users.component';
import {UserModel} from '@app/repository/user_repository.model';
import { UserShowComponent } from './user-show/user-show.component';


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
    }),
    NgxFileDropModule,
    NgxGalleryModule,
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
    UploadImageComponent,
    GaleryComponent,
    UsersComponent,
    UserShowComponent,


  ],
  providers: [

    ProblemModel, ProblemModelResolver, LocationModel, DistrictModel, DomainModel, CommentModel, UserModel,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
