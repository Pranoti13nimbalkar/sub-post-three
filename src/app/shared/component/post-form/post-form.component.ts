import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPlayer } from '../../models/playes';
import { PostService } from '../../services/post.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
PostForm ! : FormGroup
isInEditMode: boolean= false
editId!:string
  constructor(private _postServ: PostService,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.patchData()
  }


  createForm(){
     this.PostForm = new FormGroup({
      playerName : new FormControl(null, [Validators.required]),
      playerInfo : new FormControl(null, [Validators.required]),
      sportType : new FormControl(null, [Validators.required]),
      country : new FormControl(null, [Validators.required]),
      isActivePlayer : new FormControl(null, [Validators.required]),
     })
  }

get formControls(){
  return  this.PostForm.controls
}
  patchData(){
    this._postServ.editPostObs$.subscribe(data=>{
      this.isInEditMode =true;
      this.editId = data.playerId
      this.PostForm.patchValue(data)
      this._snackbar.openSnackbar(`The player post with id ${data.playerId} patch successfully!!!`)
    })
  }


  onUpdate(){
    if(this.PostForm.valid){
      let updated_post: IPlayer = ({...this.PostForm.value, playerId: this.editId})
       this.isInEditMode= false;
        this._postServ.updatePost(updated_post).subscribe({
          next: data=>{
            this._postServ.setUpdatePost(data)
            this.PostForm.reset()
          },
          error: err=>{
            console.log(err);
            
          }
        })
    }
  }
  onSubmit(){
    if(this.PostForm.valid){
      let playerObj: IPlayer = this.PostForm.value;
      this._postServ.createPost(playerObj).subscribe({
        next: res=>{
          this.PostForm.reset()
          this._postServ.setNewPost({...playerObj, playerId: res.name})
        },
        error: err=>{
          console.log(err);
        }
      })
    }
  }
}
