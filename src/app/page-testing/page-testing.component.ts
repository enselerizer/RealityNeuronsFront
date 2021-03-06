import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataModelService } from '../data-model.service';

@Component({
  selector: 'app-page-testing',
  templateUrl: './page-testing.component.html',
  styleUrls: ['./page-testing.component.css']
})
export class PageTestingComponent implements OnInit {

  constructor(private dm: DataModelService, private cd: ChangeDetectorRef) { }

  images: string[] = null;

  data;
  search_request;
  count;


  ngOnInit(): void {
    this.dm.data.subscribe((data) => {   
      this.data = data;
      if(!this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    });
    this.dm.getImageIds();
  }

  changeListener($event) : void {
    this.readLoadedImages($event.target);
    this.images = [];
  }
  
  readLoadedImages(inputValue: any): void {
    this.filesToBase64Reccursive(0, inputValue.files.length - 1, this.images, inputValue.files); 
  }

  filesToBase64Reccursive(cur, max, images, files) {
    let file = files[cur];
    let myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.images.push(myReader.result as string);
      if(cur < max) {
        this.filesToBase64Reccursive(cur+1, max, images, files)
      } else {
        return true;
      }
    }
    myReader.readAsDataURL(file);
  }

  loadFromPC() {
    this.dm.uploadImages(this.images);
  }
  
  loadFromYandex() {
    this.dm.ImagesFromYandex(this.search_request, this.count);
  }

  startTraining() {
    this.dm.startTraining();
  }

  link() {
    return this.dm.getLinkById(this.data.session_id, this.data.test_result.image_id);
  }

}
