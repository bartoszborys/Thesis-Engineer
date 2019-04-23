import { Component, OnInit, Input } from '@angular/core';
import { ThesisDetails } from 'src/app/models/backend-integration-models/ThesisDetails';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-thesis-grades',
  templateUrl: './thesis-grades.component.html',
  styleUrls: ['./thesis-grades.component.css']
})
export class ThesisGradesComponent implements OnInit {
  @Input() thesisDetails: ThesisDetails;
  constructor() { }

  ngOnInit() {
  }

  public averageGrade(): number | null{
    const studyGradePart = parseFloat(this.thesisDetails.studyGrade) * 0.5;
    const defenseGradePart = parseFloat(this.thesisDetails.defenseGrade) * 0.25;
    const thesisGradePart = parseFloat(this.thesisDetails.thesisGrade) * 0.25;

    if(studyGradePart === 0 || defenseGradePart === 0 || thesisGradePart === 0){
        return 0;
    }

    const finallyGrade = (studyGradePart + defenseGradePart + thesisGradePart);
    return finallyGrade;
  }

  public finallyGrade(): number{
    const averageGrade = this.averageGrade();
    switch(true){
      case (averageGrade >= 3 && averageGrade <= 3.36):
        return 3;
      case (averageGrade > 3.36 && averageGrade <= 3.80):
        return 3.5;
      case (averageGrade > 3.80 && averageGrade <= 4.20):
        return 4;
      case (averageGrade > 4.20 && averageGrade <= 4.60):
        return 4.5;
      case (averageGrade > 4.60 && averageGrade <= 5.00):
        return 5;
      default:
        return 0;
    }
  }
}
