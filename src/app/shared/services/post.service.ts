import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlayer, IPlayerRes } from '../models/playes';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
BASE_URL: string = environment.BASE_URL;
POST_URL: string = `${this.BASE_URL}/post-three.json`
  constructor(private _http: HttpClient) { }
newPostSub$: Subject<IPlayer> = new Subject<IPlayer>();
removePostSub$: Subject<string> = new Subject<string>();
editPostSub$: Subject<IPlayer> = new Subject<IPlayer>();
updatePostSub$: Subject<IPlayer> = new Subject<IPlayer>();

newPostObs$: Observable<IPlayer> = this.newPostSub$.asObservable()
removePostObs$: Observable<string> = this.removePostSub$.asObservable()
editPostObs$: Observable<IPlayer> = this.editPostSub$.asObservable()
updatePostObs$: Observable<IPlayer> = this.updatePostSub$.asObservable()


setNewPost(player: IPlayer){
 this.newPostSub$.next(player)
}


setRemoveObs(post:string){
  this.removePostSub$.next(post)
}

setEditPost(post:IPlayer){
  this.editPostSub$.next(post)
}


setUpdatePost(updatePost:IPlayer){
  this.updatePostSub$.next(updatePost)
}

  fetchAllPost(): Observable<IPlayer[]>{
   return this._http.get<any>(this.POST_URL).pipe(
    map(obj =>{
      let postArr: IPlayer[]=[]
      for (const key in obj) {
        postArr.unshift({...obj[key], playerId:key})   
      }
      return postArr
    })
   )
  }


  createPost(post:IPlayer):Observable<IPlayerRes>{
    return this._http.post<any>(this.POST_URL,post)
  }


  updatePost(updatePost:IPlayer): Observable<IPlayer>{
    return this._http.patch<IPlayer>(`${this.BASE_URL}/post-three/${updatePost.playerId}.json`,updatePost)
  }

  removePost(removeId:string) : Observable<string>{
     return this._http.delete<string>(`${this.BASE_URL}/post-three/${removeId}.json`)
  }
}
