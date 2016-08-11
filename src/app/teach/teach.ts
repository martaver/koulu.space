import {Component, ViewChild, NgZone} from '@angular/core';
import { Router } from "@angular/router";
import {PhotoBooth, GotSnapshotEvent} from "../photo-booth/photo-booth";
import {KouluToolbar} from "../koulu-toolbar/koulu-toolbar";
import {TeachDetails, GotDetailsEvent} from "./teach-details";
import {TeachSelfie} from "./teach-selfie";
import {UploadService} from "./UploadService";

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
  directives: [KouluToolbar, TeachDetails, TeachSelfie],
  providers: [UploadService],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
<div id="teach-container">

  <koulu-toolbar title="Start teaching"></koulu-toolbar>    
  <teach-selfie *ngIf="state == State.Selfie" (gotSelfie)="onGotSelfie($event)" ></teach-selfie>  
  <div *ngIf="state == State.Details" class="teach-details-container">
    <div class="after-selfie-container">
      <img [src]="snapshot.dataUrl" class="after-selfie">
    </div>
    <teach-details (detailsSubmitted)="onDetailsSubmitted($event)"></teach-details>
  </div>  
  
</div> 

`
})
export class Teach {

  @ViewChild(TeachSelfie) selfie:TeachSelfie;

  public State = State;
  state: State = State.Selfie;
  snapshot: GotSnapshotEvent;

  // TypeScript public modifiers
  constructor(public router: Router, private upload: UploadService, private zone: NgZone) {

  }

  ngOnInit() {

  }


  onGotSelfie(snapshot: GotSnapshotEvent) {

    this.snapshot = snapshot;
    this.state = State.Details;
  }

  onDetailsSubmitted(details: GotDetailsEvent){

    console.log('uploading...', details);
    this.upload.makeBlobRequest('/api/upload.php', details.name, details.email, details.topic, this.snapshot.blob, 'selfie.png').subscribe((response) => {

      this.zone.run(() => {
        console.log('uploaded!', response)
      });
    });
  }
}
