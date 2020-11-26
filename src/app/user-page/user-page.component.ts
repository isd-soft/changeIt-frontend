import { Component, OnInit } from '@angular/core';
import {User} from '@app/models';
import {AccountService} from '@app/service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user: User;
  selectedFile: File;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
  }

  onFileSelected(event): void {
    this.selectedFile = (event.target.file as File);
  }

  onUpload(): void {
/*    const fd = new FormData();
    fd.append('userLogo', this.selectedFile, 'fileName');*/
    this.accountService.saveUserLogo(this.selectedFile);
  }
}
