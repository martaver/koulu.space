import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import {PhotoBooth, GotSnapshotEvent} from "../photo-booth/photo-booth";
import {KouluToolbar} from "../koulu-toolbar/koulu-toolbar";
import {TeachDetails} from "./teach-details";
import {TeachSelfie} from "./teach-selfie";

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
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
<div id="teach-container">

  <koulu-toolbar title="Start teaching"></koulu-toolbar>    
  <teach-selfie *ngIf="state == State.Selfie" (gotSelfie)="onGotSelfie($event)" ></teach-selfie>  
  <div *ngIf="state == State.Details">
    <div class="after-selfie-container">
      <img [src]="snapshot.dataUrl" class="after-selfie">
    </div>
    <teach-details></teach-details>
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
  constructor(public router: Router) {

  }

  ngOnInit() {

  }


  onGotSelfie(snapshot: GotSnapshotEvent) {

    this.snapshot = snapshot;
    this.state = State.Details;
  }
}
