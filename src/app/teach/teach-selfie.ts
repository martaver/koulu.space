/**
 * Created by sebas_000 on 9/08/2016.
 */
import {Component, EventEmitter, Output, ViewChild, NgZone, ElementRef} from '@angular/core';
import {PhotoBooth, GotSnapshotEvent} from "../photo-booth/photo-booth";

declare var loadImage: any;

@Component({
  selector: 'teach-selfie',
  styleUrls: [ './teach.style.css' ],
  directives: [PhotoBooth],
  template: `

    <div class="teach-container-content">
                
      <div class="teach-container-instructions">
        Give us a crazy smile!
      </div>
      
      <div class="center" style="padding: 12px;">
        <div class="constrain-ratio-1-1" style="width: 70%;">
            <div class="constrain-ratio-content" style="overflow: hidden;">
                <div class="circle" style="height: 100%; width: 100%; position: relative; overflow: hidden;">
                  <photo-booth (gotSnapshot)="onGotSnapshot($event)"></photo-booth>
                </div>        
            </div>
          </div>
      </div>
      
      <div *ngIf="iOS" id="photo-booth-ios">
        
        <img [src]="dataUrl" *ngIf="dataUrl">
        
        <div class="take-picture constrain-ratio-4-3" *ngIf="!(dataUrl)">
          <label class="constrain-ratio-content"> <!--Technique for styling file upload inputs: http://stackoverflow.com/questions/21842274/cross-browser-custom-styling-for-file-upload-button-->
            <input type="file" accept="image/*" capture="camera" (change)="onInputChanged($event)">
            <div class="icon-circle">
              <i class="material-icons">photo_camera</i>
            </div>            
          </label>  
        </div>        
      </div>
      
      <canvas id="photo-booth-ios-canvas" style="display: none"></canvas>
      
    </div>
    
    <div class="teach-container-actions" *ngIf="!hasSnapshot">   
        
      <button md-button (click)="backToSnapshot($event)">
        <i class="material-icons">photo_camera</i>
      </button>
          
    </div>
    
    <div class="teach-container-actions" *ngIf="hasSnapshot">
    
      <button md-button (click)="nup($event)" >
        <i class="material-icons">thumb_down</i>
      </button>
        
      <button md-button (click)="yup($event)">
        <i class="material-icons">thumb_up</i>
      </button>
          
    </div>
`
})
export class TeachSelfie{

  private window :any;
  private navigator :any;
  private iOS: any;

  @Output() gotSelfie = new EventEmitter();

  @ViewChild(PhotoBooth) photoBooth:PhotoBooth;

  private hasSnapshot: boolean;
  private snapshot: GotSnapshotEvent;
  private dataUrl: string;
  private orientation: any;

  constructor(private zone: NgZone) {

  }


  ngOnInit() {

    this.window = window;
    this.navigator = window.navigator;
    this.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !this.window.MSStream;
  }

  private onGotSnapshot(event:GotSnapshotEvent) {

    this.snapshot = event;
    this.hasSnapshot = true;
  }

  private onInputChanged(event) {

    event.preventDefault();

    loadImage.parseMetaData(event.target.files[0], data => { this.zone.run(() => {

        this.orientation = data.exif ? data.exif.get('Orientation') : 1;

        var options = {
          orientation: this.orientation,
          canvas: true
        };

        var handleLoad = canvas => { this.zone.run(() => {

          this.dataUrl = canvas.toDataURL('image/png');
          canvas.toBlob(blob => { this.zone.run(() => {

            this.snapshot = new GotSnapshotEvent(blob, this.dataUrl);
            this.hasSnapshot = true;
          })});
        })};

        loadImage(event.target.files[0], handleLoad, options);
      });
    });

  }

  private backToSnapshot(event) {

    event.preventDefault();

    this.photoBooth.snapshot()
  }

  private nup(event){

    event.preventDefault();

    if(!this.iOS) this.photoBooth.start();
    this.dataUrl = null;
    this.snapshot = null;
    this.hasSnapshot = false;
  }

  private yup(event){

    event.preventDefault();
    this.gotSelfie.emit(this.snapshot);
  }

}
