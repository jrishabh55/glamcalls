import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private af: AngularFireAuth) {}

    canActivate(): Observable<boolean> {
      return this.af.authState
        .take(1)
        .map((authState) => !!authState)
        .do(authenticated => {
          if (!authenticated) {
                this.router.navigateByUrl('/login');
            }
        });
    }
}
