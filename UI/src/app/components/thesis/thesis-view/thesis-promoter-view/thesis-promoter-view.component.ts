import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ThesisService } from 'src/app/services/thesis/thesis.service';
import { ThesisDetails } from 'src/app/models/backend-integration-models/ThesisDetails';

@Component({
  selector: 'app-thesis-promoter-view',
  templateUrl: './thesis-promoter-view.component.html',
  styleUrls: ['./thesis-promoter-view.component.css']
})
export class ThesisPromoterViewComponent implements OnInit {
  graduate_id: string;
  details: ThesisDetails;
  possibleGrades = [null, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  constructor(private route: ActivatedRoute, private thesisService: ThesisService) { }

  ngOnInit() {
    this.setCurrentGraduateId();
    this.reloadDetails();
  }

  public async setCurrentGraduateId() {
    await this.route.paramMap.subscribe(
      (params: ParamMap) => this.graduate_id = params.get('id')
    );
  }

  public async reloadDetails(){
    await this.thesisService.get(this.graduate_id).subscribe(
      (response: ThesisDetails) =>{
        this.details = response;
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }

  editGrades: boolean = false;
  public editGrade(){
    this.editGrades = true;
  }

  public changeGrades(grades: any){
    this.thesisService.updateGrades(this.graduate_id, grades).subscribe(
      (response: any) => this.reloadDetails(),
      (error: any) => alert(JSON.stringify(error))
    )
    this.cancelGrade();
  }
  
  public cancelGrade(){
    this.editGrades = false;
  }

  public changeState(to: string){
    this.thesisService.changeState(this.graduate_id, to).subscribe(
      result => this.reloadDetails(),
      error => alert(JSON.stringify(error))
    )
  }

  fileToSend: any;
  loadFile(event: any){
    this.fileToSend = event.target.files[0];
  }

  public sendThesis(): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64file: string = reader.result as string;
      this.thesisService.sendFileAsPromoter(this.graduate_id ,base64file).subscribe(
        (response) => console.log(response)
      );
    }
    reader.readAsDataURL(this.fileToSend);
  }

  public downloadFile(role: string){
    this.thesisService.downloadFileAsPromoter(this.graduate_id, role).subscribe(
      blob => this.readFile(blob)
    )
  }
  
  iframeUrl: string = null;
  public readFile(blob){
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

  public addNewComment(messageValue: string){
    this.setCurrentGraduateId();
    this.thesisService.newComment(this.graduate_id, {
      text: messageValue,
      date: undefined
    }).subscribe(
      x => alert("Komentarz dodany poprawnie"),
      x => alert("Nie udalo sie dodac komentarza")
    );
  }
}
