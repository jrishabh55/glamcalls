import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddComponent } from '../components/notifications/add/add.component';
import { ListComponent } from '../components/notifications/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [AddComponent, ListComponent]
})
export class NotificationsModule { }
