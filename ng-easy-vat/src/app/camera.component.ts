import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss'
})
export class CameraComponent  implements AfterViewInit, OnDestroy{

  @ViewChild('video', { static: true })_video!: ElementRef<HTMLVideoElement>;
  
  ngAfterViewInit(): void {
    this.openMediaDevice();
  }

  ngOnDestroy(): void {
    this.closeMediaDevice();
  }

  openMediaDevice(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream: MediaStream) => {
      const _video = this._video.nativeElement;
      _video.srcObject = stream;
      _video.play(); 
    })
    .catch((err) => {
      console.log(err);
    })
  }

  closeMediaDevice(): void {
    const stream = this._video.nativeElement.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
  }
} 
