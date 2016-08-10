/**
 * Created by sebas_000 on 9/08/2016.
 */

import {Component, Output, EventEmitter} from '@angular/core'
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdInput} from "@angular2-material/input";

@Component({

  selector: 'teach-details',
  styleUrls: [ './teach.style.css' ],
  directives: [MdInput, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  template: `
<form id="details-form" [formGroup]="detailsForm" (submit)="onDetailsSubmit($event)">  
  
  <div class="details-form-group">
    <md-input [formControl]="detailsForm.controls['name']" id="name" type="text" placeholder="Your name">
    <md-hint>Testing...</md-hint>
</md-input>
    <md-input [formControl]="detailsForm.controls['email']" id="email" type="email" placeholder="Your email"></md-input>  
    <md-input [formControl]="detailsForm.controls['topic']" id="topic" type="text" placeholder="What are you teaching?"></md-input>
  </div>
  
  <div class="teach-container-actions">
    <button md-button type="submit"><span class="action">Add me</span></button>
  </div>
</form>
`
})
export class TeachDetails {

  @Output() detailsSubmitted = new EventEmitter();

  private detailsForm: FormGroup;

  constructor(fb: FormBuilder) {

    this.detailsForm = fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      topic: ["", Validators.required]
    })
  }

  onDetailsSubmit(event){

    if(this.detailsForm.valid){

      console.log(this.detailsForm.value);
      this.detailsSubmitted.emit(this.detailsForm.value);
    }

    event.preventDefault();
  }
}
