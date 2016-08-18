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
      
      <div *ngIf="!iOS" class="center" style="padding: 12px;">
        <div class="constrain-ratio-1-1" style="width: 70%;">
            <div class="constrain-ratio-content">
                <div class="circle" style="height: 100%; width: 100%; position: relative; overflow: hidden;">
                  <photo-booth (gotSnapshot)="onGotSnapshot($event)"></photo-booth>
                </div>        
            </div>
          </div>
      </div>
      
      <div *ngIf="iOS" id="photo-booth-ios" class="center">                                             
        
        <div class="take-picture constrain-ratio-1-1" style="width: 70%">
          
          <label *ngIf="!(dataUrl)" class="constrain-ratio-content"> <!--Technique for styling file upload inputs: http://stackoverflow.com/questions/21842274/cross-browser-custom-styling-for-file-upload-button-->
            <input type="file" accept="image/*" capture="camera" (change)="onInputChanged($event)">
            <div class="icon-bg center circle">
              <i class="material-icons">photo_camera</i>
            </div>            
          </label>  
          
          <div *ngIf="dataUrl" class="constrain-ratio-content">
            <img [src]="dataUrl" class="circle">
          </div>          
          
        </div>        
      </div>
      
      <canvas id="photo-booth-ios-canvas" style="display: none"></canvas>
      
    </div>   
    
    <div class="teach-container-actions" >
    
      <button md-button (click)="backToSnapshot($event)" *ngIf="!hasSnapshot && !iOS"> 
        <i class="material-icons">photo_camera</i>
      </button>
    
      <button md-button (click)="nup($event)" *ngIf="hasSnapshot">
        <i class="material-icons">thumb_down</i>
      </button>
        
      <button md-button (click)="yup($event)" *ngIf="hasSnapshot">
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

  private dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    return new Blob([ab], {type: mimeString});
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

          this.dataUrl = canvas.toDataURL('image/jpeg');
          this.snapshot = new GotSnapshotEvent(this.dataURItoBlob(this.dataUrl), this.dataUrl);
          this.hasSnapshot = true;
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
