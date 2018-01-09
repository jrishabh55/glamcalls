export interface User {
    name: string;
    username: string;
    email: string;
    uid: string;
    date: string;
}

export interface Audition {
    castingUpdateFor: string | Array<string>;
    projectDetails: string;
    lookingFor: string;
    ageGroup: string;
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