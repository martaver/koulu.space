/**
 * Created by sebas_000 on 20/07/2016.
 */

import {Component, ElementRef, AfterViewInit} from '@angular/core';

enum State {
  Recording,
  Confirming
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

<div *ngIf="state == State.Recording" id="recorder">
  <video muted autoplay (click)="snapshot()"></video>
  <canvas></canvas>
  Testing
</div>

<div *ngIf="state == State.Confirming" id="confirmer">
  <img [src]="imgSrc"/>
</div>

`
})
export class PhotoBooth  implements AfterViewInit {


  public State = State;
  state: State = State.Recording;
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  navigator: any;
  window: any;
  imgSrc: string;
  private context: CanvasRenderingContext2D;

  constructor(public element: ElementRef) {


  }

  ngAfterViewInit() {

    this.start();
  }

  public start() {

    this.video = this.element.nativeElement.querySelector('#recorder').querySelector('video');

    this.window = window;
    this.navigator = window.navigator;
    this.navigator.getUserMedia = this.navigator.getUserMedia || this.navigator.webkitGetUserMedia || this.navigator.mozGetUserMedia || this.navigator.msGetUserMedia;

    if (this.window.stream) {

      this.video.src = null;
      if(this.window.stream.stop) this.window.stream.stop();
    }

    var constraints = {
      audio: false,
      video: true
    };

    this.navigator.getUserMedia(constraints, (stream) => {

      //Success
      this.window.stream = stream; // make stream available to console

      if (this.navigator.mozGetUserMedia) {
        this.video["mozSrcObject"] = stream;
      } else {
        var vendorURL = window.URL || window.hasOwnProperty("webkitURL");
        this.video.src = vendorURL.createObjectURL(stream);
      }

      this.video.play();

    }, (error) => {

      //Error
      console.log('navigator.getUserMedia error: ', error);

    });
  }


  public snapshot() {

    if(this.window.stream) {

      this.canvas = this.element.nativeElement.querySelector('#recorder').querySelector('canvas');
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;

      this.context = this.canvas.getContext('2d');
      this.context.drawImage(this.video, 0, 0);

      // // "image/webp" works in Chrome.
      // // Other browsers will fall back to image/png.
      this.imgSrc = this.canvas.toDataURL('image/webp');

      this.state = this.State.Confirming;
    }
  }
}
