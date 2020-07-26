import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Search Text App';

  fileContent: string = '';
  searchCount: number = 0;
  searchText: string = '';
  isShow = true;

  public onChange(fileList: FileList) {
    let fileUploaded = fileList[0];
    let thisFile = this.fileContent;
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this.fileContent = <string>fileReader.result;
      this.isShow = !this.isShow;
    }
    fileReader.readAsText(fileUploaded);
    console.log(this.fileContent);
  }

  public highlight() {
    this.searchCount = 0;
    if (!this.searchText) {

      return this.fileContent;
    }
    return this.fileContent.replace(new RegExp(this.searchText, "gi"), match => {
      this.searchCount = ((this.fileContent).match(new RegExp(this.searchText, "gi")) || []).length;
      return '<span class="highlightText">' + match + '</span>';
    });
  }

  public search() {
    this.highlight();
  }

  public goBack() {
    this.isShow = !this.isShow;
    this.fileContent= '';
    this.searchCount= 0;
    this.searchText= '';
  }

}
