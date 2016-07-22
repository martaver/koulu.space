/**
 * Created by sebas_000 on 20/07/2016.
 */

import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'photo-booth',
  styles: [`
  video {
    width: 100%;
  }
`],
  template: `<video muted autoplay></video>`
})
export class PhotoBooth {

  videoElement: Element;
  navigator: any;
  window: any;


  constructor(public element: ElementRef) {


  }

  ngOnInit() {

    this.videoElement = this.element.nativeElement.querySelector('video');

    this.window = window;
    this.navigator = window.navigator;
    this.navigator.getUserMedia = this.navigator.getUserMedia || this.navigator.webkitGetUserMedia || this.navigator.mozGetUserMedia || this.navigator.msGetUserMedia;

    this.start();
  }

  public start() {

    if (this.window.stream) {
      this.videoElement.src = null;
      if(this.window.stream.stop) this.window.stream.stop();
    }

    var constraints = {
      audio: false,
      video: true
    };

    this.navigator.getUserMedia(constraints, (stream) => {

      //Success
      this.window.stream = stream; // make stream available to console
      this.videoElement.src = this.window.URL.createObjectURL(stream);
      this.videoElement.play();

    }, (error) => {

      //Error
      console.log('navigator.getUserMedia error: ', error);

    });
  }
}
