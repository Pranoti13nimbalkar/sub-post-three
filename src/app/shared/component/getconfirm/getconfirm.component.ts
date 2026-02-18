import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconfirm',
  templateUrl: './getconfirm.component.html',
  styleUrls: ['./getconfirm.component.scss']
})
export class GetconfirmComponent implements OnInit {
  msg! :string
  constructor(private _matRef: MatDialogRef<GetconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data : string
  ) {
    this.msg=data
   }

  ngOnInit(): void {
  }


  OnClose(flag:boolean){
    this._matRef.close(flag)
  }
}
