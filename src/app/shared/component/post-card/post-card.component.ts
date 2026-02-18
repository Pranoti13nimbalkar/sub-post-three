import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from '../../models/playes';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import { filter, finalize, switchMap } from 'rxjs';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
@Input() playerObj !: IPlayer
  constructor(private _matDailog: MatDialog,
    private _postServ: PostService
  ) { }

  ngOnInit(): void {
  }

  onEdit(){
    this._postServ.setEditPost(this.playerObj)
  }

  onRemove(){
   let matConfig=  new MatDialogConfig()
   matConfig.data = `Are You sure you want to remove  this Id  ${this.playerObj.playerId}`,
   matConfig.width= '400px',
   matConfig.disableClose= true
   this._matDailog.open(GetconfirmComponent, matConfig).afterClosed().pipe(
    filter(res=> res=== true),
   switchMap(()=>{
    return this._postServ.removePost(this.playerObj.playerId)
   })
   ).subscribe({
    next: res=>{
      this._postServ.setRemoveObs(this.playerObj.playerId)
    },
    error: err=>{
    console.log(err);
    
    }
   })
  }
}
