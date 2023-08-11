import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day35workshop';
  itemsPerPage = [5,10,20,30,50]
  noOfRecPerPage!: number;
  form!: FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void{
    this.form = this.createForm();
  }

  clearForm(){
    this.form = this.createForm();
  }

  newRecPerPage(){
    this.noOfRecPerPage = this.form.value.noOfRecPerPage;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      noOfRecPerPage: this.fb.control<number>(5, [Validators.required])
    })
  }
}
