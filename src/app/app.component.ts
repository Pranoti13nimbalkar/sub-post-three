import { Component, inject, OnInit } from '@angular/core';
import { InterceptorService } from './shared/services/interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sub-post-three';
  isLodder:boolean= false;

  private _interCept = inject(InterceptorService)
 
  ngOnInit(): void {
    this._interCept.isLodingObs$.subscribe(status=>{
      this.isLodder = status
    })
  }
}
