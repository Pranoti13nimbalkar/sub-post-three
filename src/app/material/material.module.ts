import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const matArr = [MatButtonModule,MatCardModule,MatDialogModule,MatDividerModule,MatSnackBarModule,MatIconModule,MatProgressSpinnerModule]

@NgModule({
  declarations: [],
  imports: [...matArr],
  exports: [...matArr] 
})
export class MaterialModule { }
