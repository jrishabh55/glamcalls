import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from '../components/blog/add/add.component';
import { ListComponent } from '../components/blog/list/list.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [AddComponent, ListComponent]
})
export class BlogsModule { }
