/**
 * Server
 * Created by Franz Bender on 14th march 2018
 */
let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');
let session = require('express-session');
let bodyParser = require('body-parser')

let general = require('./page/general/route');


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'template'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'QAodmpqiEqHRwzSXHzMy',
    cookie: {
        maxAge: 600000
    }
}));

app.use('/static', express.static('static'));

app.use('', general);

let pages = fs.readdirSync('page/');
for (let i = 0; i < pages.length; i++) {
    let dirpath = `page/${pages[i]}`;
    let status = fs.statSync(dirpath);
    if (status && status.isDirectory()) {
        let name = path.basename(dirpath);
        let route = `./${dirpath}/route.js`;
        if (fs.existsSync(route)) {
            app.use(`/${name}`, require(route));
        }
    }
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
