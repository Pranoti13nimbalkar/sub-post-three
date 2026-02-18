import { Component, OnInit } from '@angular/core';
import { IPlayer } from '../../models/playes';
import { PostService } from '../../services/post.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {
playersArr: IPlayer[]=[]
  constructor(private _postServ: PostService,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getPlayer()
    this.createNewPost()
    this.removePost()
    this.updatedPost()
  }
  

getPlayer(){
  this._postServ.fetchAllPost().subscribe({
    next: res=>{
      this.playersArr = res
      console.log(res);
      
    }
  })
}

createNewPost(){
  this._postServ.newPostObs$.subscribe(res=>{
    this.playersArr.unshift(res);
    this._snackbar.openSnackbar(`The player post with id${res.playerId} created successfuly!!`)
  })
}

removePost(){
  this._postServ.removePostObs$.subscribe(removeId=>{
    let getIndex = this.playersArr.findIndex(post=>post.playerId = removeId)
    this.playersArr.splice(getIndex,1)
    this._snackbar.openSnackbar(`The player post with id${removeId} Removed successfuly! `)
  })
}


updatedPost(){
  this._postServ.updatePostObs$.subscribe(upost=>{
    let getIndex = this.playersArr.findIndex(post=>post.playerId === upost.playerId)
    this.playersArr[getIndex]= upost
        this._snackbar.openSnackbar(`The player post with id${upost.playerId} Updated successfuly! `)


  })
}
}
