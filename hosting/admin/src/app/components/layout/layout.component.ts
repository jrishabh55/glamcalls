import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'jnex-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) { }

    logout() {
        this.auth.logout()
        .then(() => {
            this.router.navigateByUrl('/login');
        });
    }

    ngOnInit() {
    }

}
