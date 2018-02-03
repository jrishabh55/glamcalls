import * as firebase from 'firebase-admin';
import * as path from 'path';

export const db = firebase.database();
export const db2 = firebase.firestore();

export function response(data: object | string, code: number = 200) {
    return {
        status: 'ok',
        code: code,
        data: data
    };
}

export function error(err: string, code = 400, data: object | string = {}) {
    return {
        status: 'error',
        code: code,
        error: err,
        data: data
    };
}

export function audition(data: object) {
    return { audition: data };
}

export function auditions(data): object {
    return { auditions: data };
}

export function etc(filename: string): string {
    return path.join(__dirname, '..', 'etc', filename);
}

export function addMonth(month: number = 1, date?: Date): Date {
    let temp: Date;
    if (!date) {
        temp = new Date(Date.now());
    } else {
        temp = date;
    }
    temp.setFullYear(temp.getFullYear(), temp.getMonth() + month, temp.getDay());
    return temp;
}

export function addYear(year: number = 1, date?: Date): Date {
    let temp: Date;
    if (!date) {
        temp = new Date(Date.now());
    } else {
        temp = date;
    }
    temp.setFullYear(temp.getFullYear() + year, temp.getMonth(), temp.getDay());
    return temp;
}
