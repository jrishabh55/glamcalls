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

    loginWithGoogle(): Promise<any> {
        return this.oAuthLogin(new firebase.auth.GoogleAuthProvider());
    }

    loginWithFacebook(): Promise<any> {
        return this.oAuthLogin(new firebase.auth.FacebookAuthProvider());
    }

    loginWithTwitter(): Promise<any> {
        return this.oAuthLogin(new firebase.auth.TwitterAuthProvider());
    }

    oAuthLogin (provider: firebase.auth.AuthProvider): Promise<any> {
        return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return this.afAuth.auth.signInWithPopup(provider)
            .catch(error => {
                if (error.code === 'auth/account-exists-with-different-credential') {
                    const pendingCred = error.credential;
                    const email = error.email;
                    return this.afAuth.auth.fetchProvidersForEmail(email).then((providers) => {
                        if (providers[0] === 'password') {
                            const password = prompt('Please Enter your Existing password');
                            return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
                                return user.link(pendingCred);
                            });
                        }

                        let nProvider;
                        switch (providers[0]) {
                            case 'google.com': nProvider = new firebase.auth.GoogleAuthProvider(); break;
                            case 'facebook.com': nProvider = new firebase.auth.FacebookAuthProvider(); break;
                            case 'twitter.com': nProvider = new firebase.auth.TwitterAuthProvider(); break;
                        }
                        return this.afAuth.auth.signInWithPopup(nProvider).then((result) => {
                            return result.user.linkWithCredential(pendingCred);
                        });
                    });
                }
                throw new Error(error);
            });
        }).then(user => this.User = firebase.auth().currentUser);
    }

    logout(): Promise<void> {
        localStorage.clear();
        return this.afAuth.auth.signOut();
    }

    get user(): firebase.User {
        return this.authenticated ? this.User : null;
    }

    get authenticated(): boolean {
        return this.User !== null;
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
