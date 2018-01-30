import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

    private authState: Observable<firebase.User>;
    public User: firebase.User = null;

    constructor(private afAuth: AngularFireAuth) {
        this.authState = afAuth.authState;
        this.authState.subscribe(user => this.User = user, error => console.log(error));
    }

    login(email: string, password: string): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(user => this.User = firebase.auth().currentUser);
    }

    logout(): Promise<void> {
        localStorage.clear();
        return this.afAuth.auth.signOut();
    }

    get user(): firebase.User {
        return this.authenticated ? this.User : null;
    }

    get authenticated(): boolean {
        return !!this.User;
    }

    get currentUserAnonymous(): boolean {
        return this.authenticated ? this.User.isAnonymous : false;
    }

    get name(): string {
        if (!this.User) {
            return 'Guest';
        } else if (this.currentUserAnonymous) {
            return 'Anonymous';
        } else {
            return this.User['displayName'] || 'User without a Name';
        }
    }

}
