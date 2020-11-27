import {Component, OnInit} from '@angular/core';
import {User} from '@app/models';
import {AccountService} from '@app/service';
import {Router} from '@angular/router';
import {UserService} from '@app/service/user.service';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {UserLogoUploadService} from '@app/service/userLogoUpload.service';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: User;
  verificationToken: string;
  files: string;
  logo: string;

  constructor(
    private userLogoUploadService: UserLogoUploadService, private accountService: AccountService,
    private router: Router, private userService: UserService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.accountService.getUserLogo(this.user.user_id).subscribe(data => {
       this.logo = 'data:image/png;base64,' + data.logo;
    });
  }

  onClick(): void {
    this.userService.getVerificationToken(this.user.email).subscribe(
      data => {
        this.verificationToken = data.token;
        this.router.navigate(['new-password'], {queryParams: {id: this.user.user_id, token: this.verificationToken}} );
      }, error => console.log(error));
  }

  public saveLogo(file: string) {
    const formData = new FormData();
    formData.append('imageFile', file);
    this.userLogoUploadService.postUserLogo(formData, this.user.user_id, { responseType: 'blob' })
      .subscribe(data => {
        this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl(`/user-page`);
        });
      });
  }

  removeUserLogo(id: number): void {
    this.accountService.deleteUserLogo(this.user.user_id).subscribe();
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`/user-page`);
    });
  }
}
