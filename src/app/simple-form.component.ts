import { Component, OnInit, ViewChild } from '@angular/core';
import { TitleService } from './title.service';
import { Title } from './title.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit {

  filteredTitles: Title[] = [];
  selectedTitle: string;
  firstName: string;
  lastName: string;
  acceptTerm: boolean = false;
  buttonClicked: boolean = false;
  defaultTitle: string;

  @ViewChild('userForm') form: NgForm;

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.getTitles();
    this.getDefaultTitle();
  }

  getTitles(): void {
    const regexPattern = new RegExp("^[A-Za-z]", 'g');
    this.titleService.getTitles()
      .subscribe(listTitles => this.filteredTitles = (listTitles.filter(({ name }) => name.match(regexPattern))).sort((a, b) => a.name.localeCompare(b.name)));
  }

  getDefaultTitle(): void {
    this.titleService.getTitles()
      .subscribe(listTitles => this.defaultTitle = (listTitles.filter(obj => obj.isDefault))[0].name);
  }

  onSubmit() {
    this.buttonClicked = true;
    if (this.form.valid) {
      this.selectedTitle = this.form.value.title;
      this.firstName = this.form.value.firstname;
      this.lastName = this.form.value.lastname;
      this.acceptTerm = this.form.value.acceptTerm;
      console.log(this.form.value);
    }
  }
}
