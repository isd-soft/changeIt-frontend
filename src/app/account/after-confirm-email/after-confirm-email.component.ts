import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '@app/service/user.service';

@Component({
  selector: 'app-after-confirm-email',
  templateUrl: './after-confirm-email.component.html',
  styleUrls: ['./after-confirm-email.component.css']
})
export class AfterConfirmEmailComponent implements OnInit {

  token: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    route.queryParams.subscribe(params => {
      this.token = params.token;
      this.userService.confirmEmail(this.token).subscribe();
    });
  }

  ngOnInit(): void {
  }

}
