import {Component, ViewChild, NgZone} from '@angular/core';
import { Router } from "@angular/router";
import {PhotoBooth, GotSnapshotEvent} from "../photo-booth/photo-booth";
import {KouluToolbar} from "../koulu-toolbar/koulu-toolbar";
import {TeachSelfie} from "./teach-selfie";
import {UploadService} from "./UploadService";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";

enum State{
  Selfie,
  Details,
  Confirm
}

@Component({
  selector: 'teach',

  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './teach.style.css' ],
  directives: [KouluToolbar, TeachSelfie],
  providers: [UploadService],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
<div id="teach-bg">

<div id="teach-container">

  <koulu-toolbar title="Sign the yearbook"></koulu-toolbar>    
  
  <form id="details-form" [formGroup]="detailsForm" (submit)="onDetailsSubmit($event)">
    
    <teach-selfie *ngIf="state == State.Selfie" (gotSelfie)="onGotSelfie($event)" ></teach-selfie>  
    
    <div *ngIf="state == State.Details" class="teach-details-container">
      
      <div class="teach-container-instructions">
          Gotcha!
      </div>
      
      <div class="after-selfie-container">
        <div class="snapshot-size constrain-ratio-1-1">
          <div class="constrain-ratio-content">
            <div class="snapshot circle" *ngIf="dataUrl" [style.background-image]="'url('+dataUrl+')'" (click)="backToSelfie()" ></div>
          </div>
        </div>                  
      </div>
      
      <div class="teach-container-instructions">
          Now, a bit about you?
      </div>
      
     <div class="details-form-group">
  
      <md-input #nameElement [formControl]="name" id="name" type="text" placeholder="Your name" maxLength="150">
        <md-hint *ngIf="!name.valid && name.touched">We need your name</md-hint>
      </md-input>
      
      <md-input [formControl]="email" id="email" type="email" placeholder="Your email" maxLength="250">
        <md-hint *ngIf="!email.valid && email.touched">We need your email</md-hint>
      </md-input>
        
      <md-input [formControl]="topic" id="topic" type="text" placeholder="What are you teaching?" maxLength="150">
        <md-hint *ngIf="!topic.valid && topic.touched">We need to know what you're teaching</md-hint>
      </md-input>
      
      </div>
      
      <div class="teach-container-actions">
        <button md-button type="submit"><i class="material-icons">thumb_up</i></button>
      </div>
      
    </div>
    
    
  
  </form>
  
</div>

</div> 

`
})
export class Teach {

  @ViewChild('nameElement') nameElement: HTMLInputElement;
  @ViewChild(TeachSelfie) selfie:TeachSelfie;

  public State = State;
  state: State = State.Selfie;
  dataUrl: string;

  private detailsForm: FormGroup;
  private name: AbstractControl;
  private email: AbstractControl;
  private topic: AbstractControl;
  private snapshot: GotSnapshotEvent;


  // TypeScript public modifiers
  constructor(public router: Router, private upload: UploadService, private zone: NgZone, private fb: FormBuilder) {

    this.detailsForm = fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      topic: ["", Validators.required]
    });

    this.name = this.detailsForm.controls['name'];
    this.email = this.detailsForm.controls['email'];
    this.topic = this.detailsForm.controls['topic'];
  }

  onGotSelfie(snapshot: GotSnapshotEvent) {

    this.snapshot = snapshot;
    this.dataUrl = snapshot.dataUrl;
    this.state = State.Details;
    // this.nameElement.focus();
  }

  backToSelfie(event) {

    event.preventDefault();

    this.snapshot = null;
    this.dataUrl = null;
    this.state = State.Selfie;
  }


  onDetailsSubmit(event){

    event.preventDefault();

    if(this.detailsForm.valid) {

      var value = this.detailsForm.value;

      this.upload.makeBlobRequest('/api/upload.php', value.name, value.email, value.topic, this.snapshot.blob, 'selfie.jpeg').subscribe((response) => {

        this.zone.run(() => {
          history.replaceState({}, "Koulu on Fire", "/");
          window.location.href = "/teacher/"+response.code ;
        });
      });

    }
    else {

      this.name.markAsTouched();
      this.email.markAsTouched();
      this.topic.markAsTouched();
    }
  }

}
