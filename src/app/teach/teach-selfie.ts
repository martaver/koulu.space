/**
 * Created by sebas_000 on 9/08/2016.
 */
import {Component, EventEmitter, Output, ViewChild, NgZone, ElementRef} from '@angular/core';
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
                
      <div *ngIf="!iOS" class="photo-booth-container">
        <photo-booth (gotSnapshot)="onGotSnapshot($event)"></photo-booth>    
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

  private window :any;
  private navigator :any;
  private iOS: any;

  @Output() gotSelfie = new EventEmitter();

  @ViewChild(PhotoBooth) photoBooth:PhotoBooth;

  private hasSnapshot: boolean;
  private snapshot: GotSnapshotEvent;
  private dataUrl: string;

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

    var input = event.target;
    if (input.files && input.files[0]) {

      var reader = new FileReader();

      reader.onload = (e) => {

        var canvas: any = document.getElementById("photo-booth-ios-canvas");
        var context: any = canvas.getContext("2d");

        // store current data to an image
        var img = new Image();
        img.src = e.target['result'];

        img.onload = () => {

          console.log('image loaded');
          // reset the canvas with new dimensions
          canvas.width = img.height;
          canvas.height = img.width;

          console.log('drawing w x h: ', img.width, img.height);

          context.translate(img.height, 0);
          context.rotate(Math.PI / 2);
          context.drawImage(img, 0, 0);

          this.zone.run(() => {


            // this.dataUrl = e.target['result'];
            this.dataUrl = canvas.toDataURL('image/png');
            this.snapshot = new GotSnapshotEvent(this.dataURItoBlob(this.dataUrl), this.dataUrl);
            this.hasSnapshot = true;
          })
        }
      };

      reader.readAsDataURL(input.files[0]);
    }
  }


  private nup(){

    this.photoBooth.start();
    this.hasSnapshot = false;
  }

  private yup(){

    this.gotSelfie.emit(this.snapshot);
  }

}
