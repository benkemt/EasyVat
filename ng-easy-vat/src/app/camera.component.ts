import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, from, map } from 'rxjs';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss'
})
export class CameraComponent  implements AfterViewInit, OnDestroy{

  @ViewChild('video', { static: true })_video!: ElementRef<HTMLVideoElement>;
  
  private _mediaDeviceInfos: MediaDeviceInfo[] = [];


  ngAfterViewInit(): void {
    this.listCameras();
   // 
  }

  ngOnDestroy(): void {
    this.closeMediaDevice();
  }

  listCameras(): void {
   from(navigator.mediaDevices.enumerateDevices()).pipe(
    map((devices: MediaDeviceInfo[]) => devices.filter((device: MediaDeviceInfo) => device.kind === 'videoinput'))
    ).subscribe((devices: MediaDeviceInfo[]) => {
      this._mediaDeviceInfos = devices;
      this.openMediaDevice();
  })}

  openMediaDevice(): void {

    navigator.mediaDevices.getUserMedia({ video: { deviceId: this._mediaDeviceInfos[0].deviceId } })

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
