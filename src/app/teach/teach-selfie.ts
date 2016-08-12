/**
 * Created by sebas_000 on 9/08/2016.
 */
import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {PhotoBooth, GotSnapshotEvent} from "../photo-booth/photo-booth";

@Component({
  selector: 'teach-selfie',
  styleUrls: [ './teach.style.css' ],
  directives: [PhotoBooth],
  template: `

    <div class="teach-container-content">
                
      <div class="teach-container-instructions">
        Give us a crazy smile!
      </div>
                
      <div class="photo-booth-container">
        <photo-booth (gotSnapshot)="onGotSnapshot($event)"></photo-booth>    
      </div>
      
    </div>
    
    <div class="teach-container-actions">
    
      <button md-button (click)="nup()" *ngIf="hasSnapshot == true">
        <i class="material-icons">thumb_down</i>
      </button>
        
      <button md-button (click)="yup()" *ngIf="hasSnapshot == true">
        <i class="material-icons">thumb_up</i>
      </button>
          
    </div>
`
})
export class TeachSelfie{

  @Output() gotSelfie = new EventEmitter();

  @ViewChild(PhotoBooth) photoBooth:PhotoBooth;

  private hasSnapshot: boolean;
  private snapshot: GotSnapshotEvent;

  private onGotSnapshot(event:GotSnapshotEvent) {

    this.snapshot = event;
    this.hasSnapshot = true;
  }

  private nup(){

    this.photoBooth.start();
    this.hasSnapshot = false;
  }

  private yup(){

    this.gotSelfie.emit(this.snapshot);
  }
}