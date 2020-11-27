import {Component, OnInit} from '@angular/core';
import {User} from '@app/models';
import {AccountService} from '@app/service';
import {Router} from '@angular/router';
import {UserService} from '@app/service/user.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: User;
  verificationToken: string;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  message: string;

  constructor(
    private httpClient: HttpClient, private accountService: AccountService, private router: Router, private userService: UserService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.userService.getVerificationToken(this.user.email).subscribe(
      data => {
        this.verificationToken = data.token;
        this.router.navigate(['new-password'], {queryParams: {id: this.user.user_id, token: this.verificationToken}} );
      }, error => console.log(error));
  }

  public onFileChanged(event): void{
    this.selectedFile = event.target.files[0];
  }

  onUpload(){
    console.log(this.selectedFile);

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.httpClient.post(`${environment.apiUrl}/user/${this.user.user_id}/user_logo`, uploadImageData, {observe: 'response'  })
      .subscribe((response) => {
        if (response.status === 200){
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      });
  }

  getImage(): void{
    this.httpClient.get(`${environment.apiUrl}/user/${this.user.user_id}/user_logo`)
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
