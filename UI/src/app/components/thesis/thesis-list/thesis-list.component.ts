import { Component, OnInit } from '@angular/core';
import { ThesisService } from 'src/app/services/thesis/thesis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thesis-list',
  templateUrl: './thesis-list.component.html',
  styleUrls: ['./thesis-list.component.css']
})
export class ThesisListComponent implements OnInit {

  graduates;
  constructor(private router: Router, private service: ThesisService) { }

  ngOnInit() {
    this.service.getGraduatesList().subscribe(
      response => this.graduates = response
    )
  }

  openThesis(index: number) {
    this.router.navigate([`/thesis/${this.graduates[index].graduateId}`]);
  }
}
