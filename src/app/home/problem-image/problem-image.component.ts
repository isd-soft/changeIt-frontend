import {Component, Input, OnInit} from '@angular/core';
import {ImageService} from '@app/service/image.service';

@Component({
  selector: 'app-problem-image',
  templateUrl: './problem-image.component.html',
  styleUrls: ['./problem-image.component.css']
})
export class ProblemImageComponent implements OnInit {

  @Input() problemId: number;
  image: string;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {

    this.imageService.getImages(this.problemId).subscribe(data => {
      const objectURL = 'data:image/png;base64,' + data[0].imageFile;
      this.image = objectURL;
    });
  }

}
