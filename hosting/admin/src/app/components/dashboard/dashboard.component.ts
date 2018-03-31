import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
    selector: 'jnex-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private af: AngularFirestore) { }

    ngOnInit() {
        // this.af.collection('/auditions').ref.where('audition_date', '>', 0).get()
        //     .then(docs => docs.forEach(doc => doc.ref.update({number: 9888675106, email: 'glamour@shwetech.in'})))
        //     .then(() => console.log('Updated'));
    }

}
