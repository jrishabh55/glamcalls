import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from '../components/users/list/list.component';
import { AddComponent } from '../components/users/add/add.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ListComponent, AddComponent]
})
export class UsersModule { }
