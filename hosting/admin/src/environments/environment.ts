// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase : {
        apiKey: 'AIzaSyBpOuPVFxfgz3DgylalQ353f1U4T40IL4I',
        authDomain: 'audition-007.firebaseapp.com',
        databaseURL: 'https://audition-007.firebaseio.com',
        projectId: 'audition-007',
        storageBucket: 'audition-007.appspot.com',
        messagingSenderId: '959476185805'
    }
};
