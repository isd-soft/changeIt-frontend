import {Component, Input, OnInit} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {ImageService} from '@app/service/image.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {User} from '@app/models';
import {AccountService} from '@app/service';
import {UserService} from '@app/service/user.service';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

  @Input() problemId: number;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  images = [];
  imagesId = [];
  user: User;
  author = false;

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private accountService: AccountService,
    private userService: UserService,
  ) {}


  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '800px',
        height: '500px',
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.user = this.accountService.userValue;
    this.userService.getProblemAuthor(this.problemId).subscribe(data => {
      if (data.user_id === this.user.user_id) {
        this.author = true;
      }
    });

    this.imageService.getImages(this.problemId).subscribe(data => {
      for (const img of data) {
        this.imagesId.push(img.id);
        const objectURL = 'data:image/png;base64,' + img.imageFile;
        this.images.push({
          small: objectURL,
          medium: objectURL,
          big: objectURL,
        });
      }
      this.galleryImages = this.images;
    });

  }

  removeImage(id: number): void {
    this.imageService.deleteImage(this.problemId, id).subscribe();
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(`/problem/${this.problemId}`);
    });
  }
}
