import {Component, Input, OnInit} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {ImageService} from '@app/service/image.service';
import {Problem} from '@app/models/problem';
import {ImageUploadService} from '@app/service/imageUpload.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  @Input() private problem: Problem;

  constructor(
    private imageUploadService: ImageUploadService,
    private router: Router,
  ) {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData = new FormData();
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

           // You could upload it like this:

          formData.append('imageFile', file, droppedFile.relativePath);

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }

    }
    this.imageUploadService.postImages(formData, this.problem.problem_id, { responseType: 'blob' })
      .subscribe(data => {
        this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl(`/problem/${this.problem.problem_id}`);
        });
      },
        error => {
        console.log(error);
        });
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }

  ngOnInit(): void {
  }
}

