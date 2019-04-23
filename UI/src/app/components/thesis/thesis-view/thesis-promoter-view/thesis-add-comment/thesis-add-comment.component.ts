import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThesisService } from 'src/app/services/thesis/thesis.service';

@Component({
  selector: 'app-thesis-add-comment',
  templateUrl: './thesis-add-comment.component.html',
  styleUrls: ['./thesis-add-comment.component.css']
})
export class ThesisAddCommentComponent implements OnInit {
  @Output() newComment: EventEmitter<string> = new EventEmitter<string>();
  constructor(private service: ThesisService) { }

  ngOnInit() {
  }
  
  addComment(text: string){
    this.newComment.emit(text);
  }
}
