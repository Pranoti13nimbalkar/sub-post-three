import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  
  constructor() { }
  isLodderSub$ : BehaviorSubject<boolean> = new BehaviorSubject(false)
  isLodingObs$ : Observable<boolean> = this.isLodderSub$.asObservable()

  setLodingStatus(status:boolean){
    this.isLodderSub$.next(status)
  }
}
