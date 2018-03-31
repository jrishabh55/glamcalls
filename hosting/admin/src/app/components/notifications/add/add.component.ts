import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
    selector: 'jnex-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    title: string;
    body: string;

    error: string;
    message: string;

    constructor(private fs: AngularFirestore) { }

    add(e) {
        e.preventDefault();
        const f = document.getElementsByTagName('form')[0];
        if (!f.checkValidity()) {
            this.error = 'Invalid data. Please fill all the details correctly';
            window.scroll(0, 0);
            return;
        }

        this.fs.collection('/notifications').add({
            title: this.title,
            body: this.body
        }).then(res => {
            this.message = 'Notification send successfully.';
            window.scroll(0, 0);
        }).catch(error => console.log(error));
    }

    ngOnInit() {
    }

}
