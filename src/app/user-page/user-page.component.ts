import {Component, OnInit} from '@angular/core';
import {User} from '@app/models';
import {AccountService} from '@app/service';
import {Router} from '@angular/router';
import {UserService} from '@app/service/user.service';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {UserLogoUploadService} from '@app/service/userLogoUpload.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: User;
  verificationToken: string;
  public files: NgxFileDropEntry[] = [];
  logo: string;

  constructor(
    private userLogoUploadService: UserLogoUploadService, private accountService: AccountService,
    private router: Router, private userService: UserService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.accountService.getUserLogo(this.user.user_id).subscribe(data => {
      if (data.logo){
        this.logo = 'data:image/png;base64,' + data.logo;
      } else {
        this.logo = 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg';
      }
    });
  }

  onClick(): void {
    this.userService.getVerificationToken(this.user.email).subscribe(
      data => {
        this.verificationToken = data.token;
        this.router.navigate(['new-password'], {queryParams: {id: this.user.user_id, token: this.verificationToken}} );
      }, error => console.log(error));
  }

  public dropped(files: NgxFileDropEntry[]): void {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          // You could upload it like this:
          const formData = new FormData();
          formData.append('imageFile', file, droppedFile.relativePath);

          this.userLogoUploadService.postUserLogo(formData, this.user.user_id, { responseType: 'blob' })
            .subscribe(data => {
              this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
                this.router.navigateByUrl(`/user-page`);
              });
            });

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event): void{
    console.log(event);
  }

  public fileLeave(event): void{
    console.log(event);
  }

  removeUserLogo(id: number): void {
    this.accountService.deleteUserLogo(this.user.user_id).subscribe();
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`/user-page`);
    });
  }
}
