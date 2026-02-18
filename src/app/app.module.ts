import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PostCardComponent } from './shared/component/post-card/post-card.component';
import { PostFormComponent } from './shared/component/post-form/post-form.component';
import { PostDashboardComponent } from './shared/component/post-dashboard/post-dashboard.component';
import { GetconfirmComponent } from './shared/component/getconfirm/getconfirm.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LodderInterceptor } from './lodder.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PostCardComponent,
    PostFormComponent,
    PostDashboardComponent,
    GetconfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LodderInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
