import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
    selector: 'jnex-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    feedbacks: any[] = [];
    collection: any;

    constructor(private af: AngularFirestore) {
      this.collection = this.af.firestore.collection("feedback");
    }

    ngOnInit() {
        this.af.firestore.collection('feedback').orderBy('created_at', 'desc').get().then(feedbacks => {
            this.feedbacks = feedbacks.docs.map(feedback => {
                let temp = feedback.data();
                let data = {};
                try {
                    data = JSON.parse(temp.message);
                } catch (e) {
                    data = { data: temp.message };
                }
                return Object.assign(temp, data, {id: feedback.id});
            });
        });
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
        this.feedbacks.every((feedback, index) => {
            if (feedback.id === id) {
                this.feedbacks.splice(index, 1);
                return false;
            }
            return true;
        });
    }

}
