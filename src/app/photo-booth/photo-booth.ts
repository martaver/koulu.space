/**
 * Created by sebas_000 on 20/07/2016.
 */

import {
  Component, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter, NgZone
} from '@angular/core';

enum State {
  Recording,
  Confirming
}

export class GotSnapshotEvent {

  constructor(public blob: Blob, public dataUrl: string) {

  }
}

@Component({
  selector: 'photo-booth',
  styles: [`
    video {
      width: 100%;
    }
    canvas {
      display: none;
    }
    img {
      width: 100%;
    }
`],
  template: `

<div id="recorder" [ngStyle]="{'display': state == State.Recording ? 'inherit' : 'none'}">
  <video muted autoplay (click)="snapshot()"></video>
  <canvas></canvas>
</div>

<div id="confirmer" [ngStyle]="{'display': state == State.Confirming ? 'inherit' : 'none'}">
  <img [src]="imgSrc"/>
</div>

`
})
export class PhotoBooth  implements AfterViewInit, OnDestroy {


  @Output() gotSnapshot = new EventEmitter();

  public State = State;
  state: State = State.Recording;
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  navigator: any;
  window: any;
  imgSrc: string;
  private context: CanvasRenderingContext2D;

  constructor(public element: ElementRef, private zone:NgZone) {

  }

  ngAfterViewInit() {

    this.window = window;
    this.navigator = window.navigator;
    this.video = this.element.nativeElement.querySelector('#recorder').querySelector('video');
    this.navigator.getUserMedia = this.navigator.getUserMedia || this.navigator.webkitGetUserMedia || this.navigator.mozGetUserMedia || this.navigator.msGetUserMedia;

    if (this.window.stream) {

      this.releaseVideo();
      this.releaseStream();
    }

    var constraints = {
      audio: false,
      video: true
    };

    this.navigator.getUserMedia(constraints, (stream) => {

      //Success
      this.window.stream = stream; // make stream available to console
      this.video.src = this.window.URL.createObjectURL(stream);
      this.video.play();

    }, (error) => {

      //Error
      console.log('navigator.getUserMedia error: ', error);

    });

    this.start();
  }

  public start() {

    this.state = State.Recording;
  }

  public snapshot() {

    if(this.window.stream) {

      this.canvas = this.element.nativeElement.querySelector('#recorder').querySelector('canvas');
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;

      this.context = this.canvas.getContext('2d');
      this.context.drawImage(this.video, 0, 0);

      this.imgSrc = this.canvas.toDataURL('image/png');

      this.state = this.State.Confirming;

      this.canvas.toBlob((blob) => {
        this.zone.run(() => {
          this.gotSnapshot.emit(new GotSnapshotEvent(blob, this.imgSrc));
        });
      });
    }
  }


  private releaseStream() {

    if(this.window.stream) {

      //Old, deprecated way of stopping the stream using MediaStream object.
      if (this.window.stream.stop) { this.window.stream.stop(); }

      //New track-based approach to managing audio & video streams.
      else {

        this.window.stream.getAudioTracks().forEach(function(track) {
          track.stop();
        });

        this.window.stream.getVideoTracks().forEach(function(track) {
          track.stop();
        });
      }

      this.window.stream = null;
    }
  }

  private releaseVideo() {

    this.video.pause();
    this.video.src = null;
    if(this.video.hasOwnProperty("mozSrcObject")) this.video["mozSrcObject"] = null;
  }

  ngOnDestroy() {

    this.releaseVideo();
    this.releaseStream();
  }
}
