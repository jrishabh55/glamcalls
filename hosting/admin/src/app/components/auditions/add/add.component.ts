import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
    selector: 'jnex-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    title: string;
    casting_update_for: string;
    project_details: string;
    looking_for: string;
    age_group: string;
    audition_date: string;
    audition_ends: string;
    audition_time: string;
    audition_address: string;
    dress_code: string;
    person_to_meet: string;
    reference: string;
    number: string;
    email: string;

    error: string;
    message: string;

    constructor(private fs: AngularFirestore) { }

    addAudition(e) {
        e.preventDefault();
        const f = document.getElementsByTagName('form')[0];
        if (!f.checkValidity()) {
            this.error = 'Invalid data. Please fill all the details correctly';
            window.scroll(0, 0);
            return;
        }

        const data = {
            casting_update_for: this.casting_update_for,
            project_details: this.project_details,
            looking_for: this.looking_for,
            age_group: this.age_group,
            audition_date: this.audition_date,
            audition_ends: this.audition_ends,
            audition_time: this.audition_time,
            audition_address: this.audition_address,
            dress_code: this.dress_code,
            person_to_meet: this.person_to_meet,
            reference: this.reference,
            number: this.number,
            email: this.email,
        };

        this.fs.collection('/auditions').add(data)
            .then(res => {
                this.message = 'Audition added succufully.';
                window.scroll(0, 0);
            }).catch(error => console.log(error));

    }

    ngOnInit() {
    }

}
