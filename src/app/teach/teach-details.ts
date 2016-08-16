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
  
`
})
export class TeachDetails {


  @Output() detailsSubmitted = new EventEmitter<GotDetailsEvent>();

  private name: AbstractControl;
  private email: AbstractControl;
  private topic: AbstractControl;

  constructor(fb: FormBuilder) {

  }





}
