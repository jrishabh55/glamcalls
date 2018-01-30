import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from '../components/quotes/add/add.component';
import { ListComponent } from '../components/quotes/list/list.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [AddComponent, ListComponent]
})
export class QuotesModule { }
