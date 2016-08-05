import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import {PhotoBooth} from "../photo-booth/photo-booth";
import {KouluToolbar} from "../koulu-toolbar/koulu-toolbar";

@Component({
  selector: 'teach',
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './teach.style.css' ],
  directives: [PhotoBooth, KouluToolbar],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
<div id="teach-container">

  <koulu-toolbar title="Start teaching"></koulu-toolbar>  
  
  <div class="teach-container-content">
    <h2>Cool!</h2>
    <p>Give us a smile, so that people can find you!</p>
        <br>
        <br>
        <br>
        <br>
        <br>        
    <div class="photo-booth-container">
      <photo-booth (gotSnapshot)="onGotSnapshot($event)"></photo-booth>    
    </div>
  </div>
  
  <div class="teach-container-actions">
    <button md-button (click)="nup()" *ngIf="hasSnapshot == true">      
      <div class="action">Nup</div>
    </button>  
    <button md-button (click)="yup()" *ngIf="hasSnapshot == true">
      <div class="action">Yup</div>
    </button>    
  </div>
</div> 

`
})
export class Teach {

  @ViewChild(PhotoBooth) photoBooth:PhotoBooth;

  private hasSnapshot: boolean;

  // TypeScript public modifiers
  constructor(public router: Router) {

  }

  ngOnInit() {

  }

  private onGotSnapshot(image:Blob){

    console.log('got snapshot');
    this.hasSnapshot = true;
  }
}
