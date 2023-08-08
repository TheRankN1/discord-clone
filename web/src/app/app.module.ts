import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ModalServerComponent } from './modals/modal-server/modal-server.component';
import { ServerComponent } from './components/server/server.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { AppRoutes } from './app.routes';
import { ModalCategoryComponent } from './modals/modal-category/modal-category.component';
import { IsNotEmptyPipe } from './pipes/is-not-empty.pipe';
import { ModalChannel } from './modals/modal-channel/modal-channel';
import { TextWithEllipsisPipe } from './pipes/text-with-ellipsis.pipe';

const COMPONENTS = [
  SideBarComponent,
  ModalServerComponent,
  ServerComponent,
  AvatarComponent,
  AppComponent,
  ModalCategoryComponent,
  ModalChannel
];
const MODULES = [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, AppRoutes];
const PIPES = [IsNotEmptyPipe, TextWithEllipsisPipe];
@NgModule({
  declarations: [COMPONENTS, PIPES],
  imports: [MODULES],
  bootstrap: [AppComponent]
})
export class AppModule {}
