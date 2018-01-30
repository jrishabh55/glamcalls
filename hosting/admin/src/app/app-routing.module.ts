import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddComponent as AuditionAddComponent } from './components/auditions/add/add.component';
import { ListComponent as AuditionListComponent } from './components/auditions/list/list.component';
import { ListComponent as UserListComponent } from './components/users/list/list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: 'dashboard',
                pathMatch: 'full',
                component: DashboardComponent
            },
            {
                path: 'auditions',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: AuditionListComponent
                    },
                    {
                        path: 'add',
                        pathMatch: 'full',
                        component: AuditionAddComponent
                    }
                ]
            },
            {
                path: 'users',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: UserListComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
