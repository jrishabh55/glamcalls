import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'jnex-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public email: string;
    public password: string;

    public weChatEnable: boolean;
    public error: string;
    public message: { msg: string, class: string };


    constructor(private auth: AuthService, private router: Router) { }

    login(email: string, password: string): void {
        this.auth.login(email, password).then(this.loggedIn.bind(this)).catch(this.loginError.bind(this));
    }

    async loggedIn(user: firebase.User) {
        this.message = { class: 'success', msg: 'Login successful. Redirecting...' };
        await user.getIdToken(true)
            .then(token => {
                localStorage.setItem('auth_token', token);
                this.router.navigateByUrl('/');
            });
    }

    loginError(err): void {
        if (err.code === 'auth/wrong-password') {
            this.error = 'Username or Password is Wrong';
        } else {
            this.error = err.message;
        }
    }

    ngOnInit() {
    }

}
