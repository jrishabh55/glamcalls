import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import Notification from '../Notification';

@Component({
    selector: 'jnex-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    notifications: Notification[] = [];
    collection: AngularFirestoreCollection<Notification>;

    constructor(private af: AngularFirestore) {
        this.collection = af.collection('/notifications');
    }

    edit() {
        alert('Please delete and re add.');
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
        this.notifications.every((notification, index) => {
            if (notification.id === id) {
                this.notifications.splice(index, 1);
                return false;
            }
        });
    }

    ngOnInit() {
        const ref = this.collection.ref;
        ref.get()
            .then((docs) => {
                docs.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    this.notifications.push(<Notification>data);
                });
            }).catch(err => console.error(err));
    }

}
