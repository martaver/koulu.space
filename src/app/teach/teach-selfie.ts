/**
 * Created by sebas_000 on 9/08/2016.
 */
import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {PhotoBooth} from "../photo-booth/photo-booth";

@Component({
  selector: 'teach-selfie',
  styleUrls: [ './teach.style.css' ],
  directives: [PhotoBooth],
  template: `

    <div class="teach-container-content">
                
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
`
})
export class TeachSelfie{

  @Output() gotSelfie = new EventEmitter();

  @ViewChild(PhotoBooth) photoBooth:PhotoBooth;

  private hasSnapshot: boolean;
  private blob: Blob;

  private onGotSnapshot(image:Blob) {

    this.blob = image;
    this.hasSnapshot = true;
  }

  private nup(){

    this.photoBooth.start();
    this.hasSnapshot = false;
  }

  private yup(){

    this.gotSelfie.emit(this.blob);
  }
}
