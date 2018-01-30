import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import User from '../user';

@Component({
    selector: 'jnex-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    users: User[] = [];
    collection: AngularFirestoreCollection<string>;

    constructor(private fs: AngularFirestore) {
        this.collection = fs.collection('/users');
    }

    disable(i: number) {
        alert('Account has not been disabled.');
    }

    delete(i: number) {
        alert('Account has not been deleted.');
    }

    ngOnInit() {
        this.collection.ref
            .get().then(snap => {
                snap.forEach(user => {
                    const data = user.data();
                    data.id = user.id;
                    this.users.push(<User>data);
                });
            });
    }

}
