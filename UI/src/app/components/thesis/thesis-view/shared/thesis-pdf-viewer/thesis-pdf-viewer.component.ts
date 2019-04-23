import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thesis-pdf-viewer',
  templateUrl: './thesis-pdf-viewer.component.html',
  styleUrls: ['./thesis-pdf-viewer.component.css']
})
export class ThesisPdfViewerComponent implements OnInit {
  @Input() iframeUrl: string;
  constructor() { }

  ngOnInit() {
  }

  dismissWindow(){
    this.iframeUrl = null;
  }
}
