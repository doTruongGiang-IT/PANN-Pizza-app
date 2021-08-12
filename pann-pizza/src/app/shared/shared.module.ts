import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NzImageModule,
    NzAvatarModule,
    NzIconModule
  ],
  exports: [
    NzImageModule,
    NzAvatarModule,
    NzIconModule
  ]
})
export class SharedModule { }
