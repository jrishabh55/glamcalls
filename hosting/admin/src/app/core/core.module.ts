import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';

import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { BlogsModule } from '../blogs/blogs.module';
import { DatePipe } from '../pipes/date.pipe';

@NgModule({
    imports: [
        CommonModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        BlogsModule,
    ],
    declarations: [DatePipe],
    providers: [AuthService, AuthGuard]
})
export class CoreModule { }
