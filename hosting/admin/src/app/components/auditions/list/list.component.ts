import { Component, OnInit } from '@angular/core';
import Audition from '../Auditions';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
    selector: 'jnex-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    auditions: Audition[] = [];
    collection: AngularFirestoreCollection<Audition>;

    constructor(private af: AngularFirestore) {
        this.collection = af.collection('/auditions');
    }

    edit() {
        alert('Please delete and re add.');
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
        this.auditions.every((audition, index) => {
            if (audition.id === id) {
                this.auditions.splice(index, 1);
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
                    this.auditions.push(<Audition>data);
                });
            }).catch(err => console.error(err));
    }

}
