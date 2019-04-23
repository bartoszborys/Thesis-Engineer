import { Component, OnInit } from '@angular/core';
import { ThesisDetails } from 'src/app/models/backend-integration-models/ThesisDetails';
import { ThesisService } from 'src/app/services/thesis/thesis.service';

@Component({
  selector: 'app-thesis-graduate-view',
  templateUrl: './thesis-graduate-view.component.html',
  styleUrls: ['./thesis-graduate-view.component.css']
})
export class ThesisGraduateViewComponent implements OnInit {
  details: ThesisDetails;
  anotherView = true;
  
  constructor(private service: ThesisService) { }

  ngOnInit() {
    this.reloadDetails();
  }

  public reloadDetails(){
    this.service.getMy().subscribe(
      (response: ThesisDetails) =>{
        this.details = response;
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }

  createYourThesis(): void{
    this.service.put().subscribe(
      (response: ThesisDetails) =>{
        this.reloadDetails();
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }

  toggle(){
    this.anotherView = !this.anotherView;
  }

  fileToSend: any;
  loadFile(event: any){
    this.fileToSend = event.target.files[0];
  }

  public sendThesis(): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64file: string = reader.result as string;
      this.service.sendFile(base64file).subscribe(
        (response) => this.reloadDetails()
      );
    }
    reader.readAsDataURL(this.fileToSend);
  }

  public downloadFile(role: string): void{
    this.service.downloadFileAsGraduate(role).subscribe(
      (response) => {
        this.readFile(response);
      }
    );
  }

  iframeUrl: string = null;
  readFile(blob){
    const toArrayBuffer = (base64: string): ArrayBuffer => {
      const binary_string =  window.atob(base64);
      const len = binary_string.length;
      const bytes = new Uint8Array( len );

      for (let currentIndex = 0; currentIndex < len; currentIndex++){
          bytes[currentIndex] = binary_string.charCodeAt(currentIndex);
      }
      return bytes.buffer as ArrayBuffer;
    }

    const newFile = new Blob([toArrayBuffer(blob.fileContents)], {type: 'application/pdf'});
    const fileURL = window.URL.createObjectURL(newFile);
    this.iframeUrl = fileURL;
  }

  dismissWindow(){
    this.iframeUrl = null;
  }
}
