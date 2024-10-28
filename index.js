const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));

app.use(express.static('public'));
app.set('view engine', 'hbs');
const mysql = require('mysql2')
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({extended: true}))

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql',
    port: 3307
})

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to joga_mysql db')
    
})

app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles = [];
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result;
        res.render('index',{articles: articles});
    });
    
});


app.listen(3003, () => {
    console.log('App is started at http://localhost:3003')
})
