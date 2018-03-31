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

    async disable(id: string) {
        alert('Account has not been disabled.');
    }

    async delete(id: string, index: number) {
        const del = confirm('Please confirm the deletion.');
        if (del) {
            await this.fs.collection('/users').doc(id).delete();
            this.users.splice(index, 1);
        }
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
