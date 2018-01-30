import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './components/layout/layout.component';
import { AddComponent } from './components/auditions/add/add.component';
import { ListComponent } from './components/auditions/list/list.component';
import { UsersModule } from './users/users.module';
import { QuotesModule } from './quotes/quotes.module';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        LayoutComponent,
        AddComponent,
        ListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CoreModule,
        UsersModule,
        QuotesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
