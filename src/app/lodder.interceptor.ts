import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { InterceptorService } from './shared/services/interceptor.service';

@Injectable()
export class LodderInterceptor implements HttpInterceptor {

  constructor(private _interServ: InterceptorService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this._interServ.setLodingStatus(true)
    
    const modifiedReq = request.clone({
       setHeaders:{
        "Auth": "TOken from Ls",
        "COntent-type": " Application/json"
       }
    })
    return next.handle(modifiedReq).pipe(
      delay(500),
      finalize(()=>{
        this._interServ.setLodingStatus(false)
      })
    )
  }
}
