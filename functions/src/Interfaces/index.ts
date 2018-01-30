export interface User {
    name: string;
    username: string;
    email: string;
    uid: string;
    date: string;
    newUser: boolean;
    auditions: number;
    plan: 'free' | 'paid';
    age_group: string[];
}

export interface Audition {
    id: string;
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
}

export interface PaymentData {
    productinfo: string;
    txnid: string;
    amount: string;
    email: string;
    phone: string;
    lastname: string;
    firstname: string;

}
