/**
 * Created by sebas_000 on 9/08/2016.
 */

import {Component, Output, EventEmitter, ViewChild} from '@angular/core'
import {
  FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators,
  FormControl, AbstractControl
} from "@angular/forms";
import {MdInput} from "@angular2-material/input";
import {UploadService} from "./UploadService";

export class GotDetailsEvent {

  constructor(public name: string, public email: string, public topic: string) {

  }
}

@Component({

  selector: 'teach-details',
  styleUrls: [ './teach.style.css' ],
  directives: [MdInput, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  template: `
<form id="details-form" [formGroup]="detailsForm" (submit)="onDetailsSubmit($event)">  
  
  <div class="details-form-group">
    <md-input #nameElement [formControl]="name" id="name" type="text" placeholder="Your name">
      <md-hint *ngIf="!name.valid && name.touched">We need your name</md-hint>
    </md-input>
    <md-input [formControl]="email" id="email" type="email" placeholder="Your email">
      <md-hint *ngIf="!email.valid && email.touched">We need your email</md-hint>
    </md-input>  
    <md-input [formControl]="topic" id="topic" type="text" placeholder="What are you teaching?">
      <md-hint *ngIf="!topic.valid && topic.touched">We need to know what you're teaching</md-hint>
    </md-input>
  </div>  
  
  <div class="teach-container-actions">
    <button md-button type="submit"><span class="action">Add me</span></button>
  </div>
</form>
`
})
export class TeachDetails {

  @ViewChild('nameElement') nameElement: HTMLInputElement;

  @Output() detailsSubmitted = new EventEmitter<GotDetailsEvent>();

  private detailsForm: FormGroup;
  private name: AbstractControl;
  private email: AbstractControl;
  private topic: AbstractControl;

  constructor(fb: FormBuilder) {

    this.detailsForm = fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      topic: ["", Validators.required]
    });

    this.name = this.detailsForm.controls['name'];
    this.email = this.detailsForm.controls['email'];
    this.topic = this.detailsForm.controls['topic'];
  }

  onDetailsSubmit(event){

    event.preventDefault();

    if(this.detailsForm.valid){

      var value = this.detailsForm.value;
      this.detailsSubmitted.emit(new GotDetailsEvent(value.name, value.email, value.topic));
    }
    else{
      this.name.markAsTouched();
      this.email.markAsTouched();
      this.topic.markAsTouched();
    }
  }

  ngOnInit(){

    this.nameElement.focus();
  }
}
