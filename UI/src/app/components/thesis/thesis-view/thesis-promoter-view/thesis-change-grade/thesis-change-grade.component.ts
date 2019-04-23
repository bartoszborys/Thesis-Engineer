import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ThesisDetails } from 'src/app/models/backend-integration-models/ThesisDetails';

@Component({
  selector: 'app-thesis-change-grade',
  templateUrl: './thesis-change-grade.component.html',
  styleUrls: ['./thesis-change-grade.component.css']
})
export class ThesisChangeGradeComponent implements OnInit {
  possibleGrades: Array<number> = [0, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  @Output() triggerSave: EventEmitter<any> = new EventEmitter<any>();
  @Input() thesisDetails: ThesisDetails;
  gradesForm: FormGroup = new FormGroup({
    defense: new FormControl(),
    thesis: new FormControl(),
    study: new FormControl()
  });

  constructor() { }

  ngOnInit() {
    this.gradesForm.get('defense').setValue(this.thesisDetails.defenseGrade);
    this.gradesForm.get('thesis').setValue(this.thesisDetails.thesisGrade);
    this.gradesForm.get('study').setValue(this.thesisDetails.studyGrade);
  }

  public saveTrigger(){
    this.triggerSave.emit(this.gradesForm.value);
  }
}
