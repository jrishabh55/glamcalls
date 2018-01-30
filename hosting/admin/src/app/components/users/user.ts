export default interface User {
    id: string;
    uid: string;
    name: string;
    username: string;
    gender: string;
    email: string;
    reference: string;
    referral: string;
    age: number;
    age_group: string[];
    tattoos: string;
    languages: string[];
    skills: string[];
    plan: 'free' | 'paid';
}
